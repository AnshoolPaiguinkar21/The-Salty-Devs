import { db } from '../../utils/db.config.ts';
import type { PostResponse } from '../Post/post.services.ts';

export type CategoryView = {
  id: number;
  name: string;
  posts: PostResponse[];
};

export type CategoryAdd = {
  name: string;
};

export const getCategories = async (): Promise<CategoryView[]> => {
  return db.category.findMany({
    select: {
      id: true,
      name: true,
      posts: {
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
      },
    },
    orderBy: { id: 'asc' },
  });
};

export const getCategory = async (id: number): Promise<CategoryView | null> => {
  return db.category.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      posts: {
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
      },
    },
  });
};

export const addCategory = async (
  category: CategoryAdd
): Promise<CategoryView> => {
  const { name } = category;

  return db.category.create({
    data: {
      name,
    },
    select: {
      id: true,
      name: true,
      posts: {
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
      },
    },
  });
};

export const editCategory = async (
  id: number,
  category: CategoryAdd
): Promise<CategoryView> => {
  const { name } = category;

  return db.category.update({
    where: {
      id,
    },
    data: {
      name,
    },
    select: {
      id: true,
      name: true,
      posts: {
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
      },
    },
  });
};

export const deleteCategory = async (id: number): Promise<void> => {
  await db.category.delete({
    where: { id },
  });
};
