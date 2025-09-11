import { AppError } from "../utils/appError.ts";
import { HttpStatusCodes } from "../utils/httpStatusCodes.ts";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

// Extending the Request type to include a user property for middleware to use
// declare module "express-serve-static-core" {
//   interface Request {
//     user: { id: string; role: Role };
//   }
// }

// Define a type for the JWT payload to ensure type safety.
type JWTPayload = {
  id: string;
  role: Role;
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new AppError("Unauthorized: No token provided.", HttpStatusCodes.UNAUTHORIZED);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JWTPayload;

    if (decoded.role !== 'ADMIN') {
      throw new AppError("Forbidden: You do not have administrator privileges.", HttpStatusCodes.FORBIDDEN);
    }

    // If the user is an admin, proceed to the next middleware or route handler.
    next();
  } catch (error: any) {
    // Pass any errors to the global error handler.
    next(error);
  }
}