import { Role } from '@prisma/client';
import { AppError } from '@utils/appError.ts';
import { HttpStatusCodes } from '@utils/httpStatusCodes.ts';
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Express Request type to include the user object
declare module 'express-serve-static-core' {
  interface Request {
    user?: { id: string; role: Role };
  }
}

type JWTPayload = {
  id: string;
  role: Role;
};

export const isAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new AppError(
        'Unauthorized. No token provided',
        HttpStatusCodes.UNAUTHORIZED
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JWTPayload;

    req.user = decoded;

    next();
  } catch (error: any) {
    next(error);
  }
};
