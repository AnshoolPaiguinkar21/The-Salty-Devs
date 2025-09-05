import { db } from '@utils/db.config.ts';
import type { User } from '@api/User/user.services.ts';
import type { PostRead } from '@api/Post/post.services.ts';

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
  id: string,
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

export const deleteComment = async (id: string): Promise<void> => {
  await db.comment.delete({
    where: { id },
  });
};
