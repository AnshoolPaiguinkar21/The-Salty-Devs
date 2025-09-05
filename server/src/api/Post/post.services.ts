import { db } from '@utils/db.config.ts';
import type { User } from '../User/user.services.ts';

export type PostRead = {
  id: string;
  title: string;
  content: string;
  publishedAt: Date;
  author: User;
};

export type PostResponse = {
  id: string;
  title: string;
  content: string | null;
  publishedAt: Date | null;
  updatedAt?: Date;
  createdAt?: Date;
  published?: boolean;
  author: {
    id: string;
    name: string | null;
    email: string;
    bio?: string | null;
  };
};

export type PostUpload = {
  title: string;
  content: string;
  published: boolean;
  authorId: string; //String
  publishedAt: Date;
  updatedAt: Date;
  //imageURL: string,
  //category    Category[]
};

export const getPosts = async (): Promise<PostResponse[]> => {
  return db.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      publishedAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  });
};

export const getPost = async (id: string): Promise<PostResponse | null> => {
  return db.post.findUnique({
    where: { id: id },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      publishedAt: true,
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

export const createPost = async (post: PostUpload): Promise<PostResponse> => {
  const { title, authorId, content, published, publishedAt } = post;
  const parsedDate: Date = new Date(publishedAt);

  return db.post.create({
    data: {
      title,
      authorId,
      content,
      published,
      publishedAt: parsedDate,
    },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      publishedAt: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          bio: true,
        },
      },
    },
  });
};

export const updatePost = async (
  id: string,
  post: PostUpload
): Promise<PostResponse> => {
  const { title, authorId, content, published, publishedAt, updatedAt } = post;
  const parsedDate: Date = new Date(publishedAt);

  return db.post.update({
    where: {
      id: id,
    },
    data: {
      title,
      authorId,
      content,
      published,
      publishedAt,
      updatedAt,
    },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      publishedAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          bio: true,
        },
      },
    },
  });
};

export const deletePost = async (id: string): Promise<void> => {
  await db.post.delete({
    where: { id },
  });
};
