import { db } from '@utils/db.config.ts';
import type { User } from '@api/User/user.services.ts';
import type { PostRead } from '@api/Post/post.services.ts';
import { AppError } from '@utils/appError.ts';
import { HttpStatusCodes } from '@utils/httpStatusCodes.ts';

export type CommentRead = {
  id: string;
  content: string;
  createdAt: Date;
  author: User;
  authorId: string;
  post: PostRead;
  postId: string;
};

export type CommentResponse = {
  id: string;
  content: string;
  createdAt: Date;
  editedAt?: Date; // newly added in type
  author: {
    id: string;
    name: string | null;
    email: string;
  };
  post?: {
    id: string;
    title: string;
  };
};

export type CommentAdd = {
  content: string;
  createdAt: Date;
  // author: User,
  authorId: string; //number
  // post : PostRead,
  postId: string; //number
};

export const getComments = async (): Promise<CommentResponse[]> => {
  return db.comment.findMany({
    select: {
      id: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  });
};

export const getComment = async (
  id: string
): Promise<CommentResponse | null> => {
  return db.comment.findUnique({
    where: { id: id },
    select: {
      id: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const addComment = async (
  comment: CommentAdd
): Promise<CommentResponse> => {
  const { postId, authorId, content, createdAt } = comment;

  if (!postId || !authorId || !content) {
    throw new AppError(
      'Bad Request: Missing required comment fields',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const parsedDate: Date = createdAt ? new Date(createdAt) : new Date();

  return db.comment.create({
    data: {
      postId,
      authorId,
      content,
      createdAt: parsedDate,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const editComment = async (
  id: string,
  userId: string,
  comment: CommentAdd
): Promise<CommentResponse> => {
  const { content } = comment;

  return db.comment.update({
    where: {
      id,
      authorId: userId,
    },
    data: {
      content,
      editedAt: new Date(),
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const deleteComment = async (
  id: string,
  userId: string
): Promise<void> => {
  await db.comment.delete({
    where: { id, authorId: userId },
  });
};
