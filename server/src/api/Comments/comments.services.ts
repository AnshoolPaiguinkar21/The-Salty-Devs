import { db } from '../../utils/db.config.ts';
import type { User } from '../User/user.services.ts';
import type { PostRead } from '../Post/post.services.ts';

export type CommentRead = {
  id: number;
  content: string;
  createdAt: Date;
  author: User;
  authorId: number; //string
  post: PostRead;
  postId: number; //string
};

export type CommentResponse = {
  id: number;
  content: string;
  createdAt: Date;
  author: {
    id: number;
    name: string | null;
    email: string;
  };
  post?: {
    id: number;
    title: string;
  };
};

export type CommentAdd = {
  content: string;
  createdAt: Date;
  // author: User,
  authorId: number; //string
  // post : PostRead,
  postId: number; //string
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
    orderBy: { id: 'asc' },
  });
};

export const getComment = async (
  id: number
): Promise<CommentResponse | null> => {
  return db.comment.findUnique({
    where: { id },
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
  const parsedDate: Date = new Date(createdAt);

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
  id: number,
  comment: CommentAdd
): Promise<CommentResponse> => {
  const { postId, authorId, content, createdAt } = comment;

  return db.comment.update({
    where: {
      id,
    },
    data: {
      postId,
      authorId,
      content,
      createdAt,
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

export const deleteComment = async (id: number): Promise<void> => {
  await db.comment.delete({
    where: { id },
  });
};
