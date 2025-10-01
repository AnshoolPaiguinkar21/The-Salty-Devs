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

const postSelectFields = {
  id: true,
  title: true,
  slug: true,
  description: true,
  content: true,
  //published: true,
  publishedAt: true,
  updatedAt: true,
  imageURL: true,
  category: {
    select: {id: true, name:true},
  },
  author: {
    select: {
      id: true,
      name: true,
    }
  }
}

export const getCategories = async (): Promise<CategoryView[]> => {
  return (await db.category.findMany({
    select: {
      id: true,
      name: true,
      posts: {
        select: postSelectFields,
      },
    },
    orderBy: { id: 'asc' },
  })) as CategoryView[];
};

export const getCategory = async (id: string): Promise<CategoryView | null> => {
  return (await db.category.findUnique({
    where: { id: id },
    select: {
      id: true,
      name: true,
      posts: {
        select: postSelectFields,
      },
    },
  })) as CategoryView | null;
};

export const addCategory = async (
  category: CategoryAdd
): Promise<CategoryView> => {
  const { name } = category;

  return (await db.category.create({
    data: {
      name,
    },
    select: {
      id: true,
      name: true,
      posts: {
        select: postSelectFields
      }
    },
  })) as CategoryView;
};

export const editCategory = async (
  id: string,
  category: CategoryAdd
): Promise<CategoryView> => {
  const { name } = category;

  return (await db.category.update({
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
        select: postSelectFields
      },
    },
  })) as CategoryView;
};

export const deleteCategory = async (id: string): Promise<void> => {

  // Sets all the category field of the respective posts(articles) to null
  await db.post.updateMany({
    where: {categoryId: id},
    data: {categoryId: null}
  });

  await db.category.delete({
    where: { id },
  });
};
