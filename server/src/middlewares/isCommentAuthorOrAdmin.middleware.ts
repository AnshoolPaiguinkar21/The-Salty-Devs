import { AppError } from '@utils/appError.ts';
import { HttpStatusCodes } from '@utils/httpStatusCodes.ts';
import type { Request, Response, NextFunction } from 'express';
import { db } from '@utils/db.config.ts';

// Checks if the user is the comment author or an admin (for editing/deleting comments)
export const isCommentAuthorOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Check if user is authenticated (should be handled by isAuthUser middleware before this)
    if (!req.user) {
      throw new AppError(
        'Unauthorized: You must be logged in to modify this comment',
        HttpStatusCodes.UNAUTHORIZED
      );
    }

    // If the user is an admin, they are authorized to proceed
    if (req.user.role === 'ADMIN') {
      return next();
    }

    const commentId = req.params.id;
    if (!commentId) {
      throw new AppError(
        'Bad Request: Comment ID is missing',
        HttpStatusCodes.BAD_REQUEST
      );
    }

    // Find the comment and check if the authenticated user is the author
    const comment = await db.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new AppError(
        'Not Found: Comment not found',
        HttpStatusCodes.NOT_FOUND
      );
    }

    // Check if the user is the author of the comment
    if (comment.authorId !== req.user.id) {
      throw new AppError(
        'Forbidden: You do not have permission to modify this comment',
        HttpStatusCodes.FORBIDDEN
      );
    }

    // If the user is the author, they are authorized
    next();
  } catch (error: any) {
    next(error);
  }
};
