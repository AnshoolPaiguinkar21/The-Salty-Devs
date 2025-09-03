import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.ts";
import { HttpStatusCodes } from "../utils/httpStatusCodes.ts";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
    });
  }
  return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
    status: "error",
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    message: "An unexpected server error occurred.",
  });
};