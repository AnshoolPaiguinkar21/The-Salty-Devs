import type { Request, Response } from 'express';
import * as CommentServices from './comments.services.ts';
import { HttpStatusCodes } from '@utils/httpStatusCodes.ts';
import { AppError } from '@utils/appError.ts';

export const getCommentsByPost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  try {
    const posts = await CommentServices.getCommentsByPost(
      postId,
      Number(req.query.skip) || 0,
      Number(req.query.take) || CommentServices.totalComments
    );
    return res.status(HttpStatusCodes.OK).json(posts);
  } catch (error: any) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json(error.message);
  }
};

export const getComment = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const uniquePost = await CommentServices.getComment(id);
    return res.status(HttpStatusCodes.OK).json(uniquePost);
  } catch (error: any) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json(error.message);
  }
};

export const addComment = async (req: Request, res: Response) => {
  if (!req.user) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ message: 'You must be logged in to add a comment.' });
  }

  const newCommentData = {
    ...req.body,
    authorId: req.user.id,
  };

  try {
    const newComment = await CommentServices.addComment(newCommentData);
    return res.status(HttpStatusCodes.CREATED).json(newComment);
  } catch (error: any) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json(error.message);
  }
};

export const editComment = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const userId: string = req.user!.id;

  try {
    const updateAuthorPost = await CommentServices.editComment(
      id,
      userId,
      req.body
    );
    return res.status(HttpStatusCodes.OK).json(updateAuthorPost);
  } catch (error: any) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json(error.message);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const userId: string = req.user!.id;

  try {
    const delPost = await CommentServices.deleteComment(id, userId);
    return res.json({ data: delPost, message: 'Post deleted' });
  } catch (error: any) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json(error.message);
  }
};
