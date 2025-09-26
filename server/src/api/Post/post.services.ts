import { db } from '@utils/db.config.ts';
import type { User } from '@api/User/user.services.ts';
import { AppError } from '@utils/appError.ts';
import { HttpStatusCodes } from '@utils/httpStatusCodes.ts';
import { Comment } from '@prisma/client';

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
  imageURL?: string | null;
  author: {
    id: string;
    name: string | null;
    email: string;
    bio?: string | null;
  };
  comments?: {
    id: string;
    content: string;
    createdAt: Date;
    editedAt: Date | null;
    author: {
      id: string;
      name: string | null;
      email: string;
    };
  }[];
};

export type PostUpload = {
  title: string;
  content: string;
  published: boolean;
  authorId: string; //String
  publishedAt: Date;
  updatedAt: Date;
  imageURL?: string;
  //category    Category[]
};

export const getPosts = async (
  skip: number,
  take: number,
  search: string
): Promise<{ data: PostResponse[]; totalCount: number }> => {

  // console.log(search)
  const data = await db.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      publishedAt: true,
      updatedAt: true,
      imageURL: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          editedAt: true,
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
    take,
    skip,
    where: {
      title: {
        contains: search,
        mode: 'insensitive',
      },
    },
    orderBy: { createdAt: 'asc' },
  });
  const totalCount = await db.post.count();
  return {
    data,
    totalCount,
  };
};

export const totalPosts = await db.post.count();

export const incrementPostView = async (
  postId: string,
  visitorId: string
): Promise<void> => {
  const existingView = await db.postViews.findUnique({
    where: {
      visitorId_postId: {
        visitorId,
        postId,
      },
    },
  });

  if (!existingView) {
    await db.postViews.create({
      data: {
        visitorId,
        postId,
      },
    });

    await db.post.update({
      where: { id: postId },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }
};

export const getPost = async (
  userId: string,
  postId: string
): Promise<PostResponse | null> => {
  if (userId) {
    await incrementPostView(postId, userId);
  }

  return db.post.findUnique({
    where: { id: postId },
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
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          editedAt: true,
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

export const createPost = async (post: PostUpload): Promise<PostResponse> => {
  // const { title, authorId, content, published, publishedAt } = post;
  const {
    title,
    authorId,
    content,
    published,
    publishedAt,
    updatedAt,
    imageURL,
  } = post;

  if (!authorId || !title || !content) {
    throw new AppError(
      'Bad Request: Missing required post fields.',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  // const parsedDate: Date = new Date(publishedAt);

  return db.post.create({
    data: {
      title,
      authorId,
      content,
      published,
      publishedAt,
      updatedAt,
      imageURL,
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
  userId: string,
  post: PostUpload
): Promise<PostResponse> => {
  const { title, content, updatedAt } = post;

  const existingPost = await db.post.findUnique({ where: { id } });

  if (!existingPost) {
    throw new AppError('Post not found', HttpStatusCodes.NOT_FOUND);
  }

  if (existingPost.authorId !== userId) {
    throw new AppError(
      'Forbidden: You are not the author of this post.',
      HttpStatusCodes.FORBIDDEN
    );
  }

  return db.post.update({
    where: {
      id: id,
    },
    data: {
      title,
      content,
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
  // Delete all the comments for the unique article
  await db.comment.deleteMany({
    where: { postId: id },
  });

  // Delete the article(post)
  await db.post.delete({
    where: { id },
  });
};
