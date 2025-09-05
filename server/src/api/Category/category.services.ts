import { db } from '@utils/db.config.ts';
import type { PostResponse } from '@api/Post/post.services.ts';

export type CategoryView = {
  id: string;
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

export const getCategory = async (id: string): Promise<CategoryView | null> => {
  return db.category.findUnique({
    where: { id: id },
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
  id: string,
  category: CategoryAdd
): Promise<CategoryView> => {
  const { name } = category;

  return db.category.update({
    where: {
      id: id,
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

export const deleteCategory = async (id: string): Promise<void> => {
  await db.category.delete({
    where: { id },
  });
};
