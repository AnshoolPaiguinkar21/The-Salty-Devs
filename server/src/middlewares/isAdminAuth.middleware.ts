import { AppError } from '../utils/appError.ts';
import { HttpStatusCodes } from '../utils/httpStatusCodes.ts';
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

// Extending the Request type to include a user property for middleware to use
// declare module "express-serve-static-core" {
//   interface Request {
//     user: { id: string; role: Role };
//   }
// }

// Define a type for the JWT payload for type safety.
type JWTPayload = {
  id: string;
  role: Role;
};

/**
 * Middleware to ensure the user is authenticated and has the 'ADMIN' role.
 * If the user is an admin, it attaches their info to the request.
 */
export const isAdminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new AppError(
        'Forbidden: You must be logged in to access this route.',
        HttpStatusCodes.FORBIDDEN
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JWTPayload;

    console.log("User role:", decoded.role);

    // Check if the decoded role is 'ADMIN'
    if (decoded.role !== 'ADMIN') {
      throw new AppError(
        'Forbidden: You do not have administrator privileges.',
        HttpStatusCodes.FORBIDDEN
      );
    }

    console.log(decoded.role);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error: any) {
    next(error);
  }
};
