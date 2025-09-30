import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { HttpStatusCodes } from '@utils/httpStatusCodes.ts';

/**
 * Validation middleware factory that creates middleware for validating request body
 * @param schema - Zod schema to validate against
 * @returns Express middleware function
 */
export const validateBody = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          status: 'error',
          message: 'Validation failed',
          errors: validationError.details.map((detail) => ({
            field: detail.path.join('.'),
            message: detail.message,
          })),
        });
      }

      // Replace req.body with validated and sanitized data
      req.body = result.data;
      next();
    } catch (error) {
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Internal validation error',
      });
    }
  };
};

/**
 * Validation middleware factory for validating request parameters
 * @param schema - Zod schema to validate against
 * @returns Express middleware function
 */
export const validateParams = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.params);

      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          status: 'error',
          message: 'Invalid parameters',
          errors: validationError.details.map((detail) => ({
            field: detail.path.join('.'),
            message: detail.message,
          })),
        });
      }

      // Replace req.params with validated data
      req.params = result.data as any;
      next();
    } catch (error) {
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Internal validation error',
      });
    }
  };
};

/**
 * Validation middleware factory for validating query parameters
 * @param schema - Zod schema to validate against
 * @returns Express middleware function
 */
export const validateQuery = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.query);

      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          status: 'error',
          message: 'Invalid query parameters',
          errors: validationError.details.map((detail) => ({
            field: detail.path.join('.'),
            message: detail.message,
          })),
        });
      }

      // Replace req.query with validated data
      req.query = result.data as any;
      next();
    } catch (error) {
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Internal validation error',
      });
    }
  };
};

/**
 * Generic validation function that can be used in controllers
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Validation result with formatted errors
 */
export const validateData = <T>(schema: ZodType<T>, data: unknown) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const validationError = fromZodError(result.error);
    return {
      success: false,
      errors: validationError.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      })),
    };
  }

  return {
    success: true,
    data: result.data,
  };
};
