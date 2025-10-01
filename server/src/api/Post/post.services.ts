import { db } from '@utils/db.config.ts';
import type { User } from '@api/User/user.services.ts';
import { AppError } from '@utils/appError.ts';
import { HttpStatusCodes } from '@utils/httpStatusCodes.ts';
import { Comment } from '@prisma/client';
import * as slugifyModule from 'slugify';

// Assign the callable function (usually found on .default) to a clean variable name.
const slugify = (slugifyModule as any).default || slugifyModule;

const generateUniqueSlug = async (
  baseSlug: string,
  excludePostId?: string
): Promise<string> => {
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (true) {
    // Setup the condition to check for the slug
    const whereCondition: any = { slug: uniqueSlug };

    // If an ID is provided (during an update), exclude that post from the check
    if (excludePostId) {
      whereCondition.NOT = { id: excludePostId };
    }

    const existingPost = await db.post.findFirst({
      where: whereCondition,
      select: { id: true },
    });

    if (!existingPost) {
      return uniqueSlug; // Found a unique slug
    }

    // If conflict, increment counter and check again (e.g., base-slug-2, base-slug-3, etc.)
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }
};

export type PostRead = {
  id: string;
  title: string;
  description?: string | null;
  content: string;
  publishedAt: Date;
  author: User;
  slug: string | null;
};

type PostCategory = {
  id: string;
  name: string;
}

export type PostResponse = {
  id: string;
  title: string;
  description?: string | null;
  content: string | null;
  slug: string | null;
  category?: PostCategory | null;
  publishedAt: Date | null;
  updatedAt?: Date;
  createdAt?: Date;
  published?: boolean;
  imageURL?: string | null;
  views?: number | null;
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
  tags?: string[];
};

export type PostUpload = {
  title: string;
  content: string;
  description?: string | null;
  published: boolean;
  authorId: string; //String
  publishedAt: Date;
  updatedAt: Date;
  imageURL?: string;
  categoryId?: string; 
  tags?:string[];
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
      slug: true,
      description: true,
      content: true,
      publishedAt: true,
      updatedAt: true,
      imageURL: true,
      category: {
        select: {id:true, name:true}
      },
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
      published: true,
    },
    orderBy: { createdAt: 'asc' },
  });
  const totalCount = await db.post.count({ where: { published: true } });
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
  slug: string
): Promise<PostResponse | null> => {
  const post = await db.post.findFirst({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      publishedAt: true,
      views: true,
      category: {
        select: {
          id:true, name:true
        }
      },
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

  if (!post) {
    return null;
  }

  if (userId) {
    await incrementPostView(post.id, userId);
  }

  return post as PostResponse;
};

export const createPost = async (post: PostUpload): Promise<PostResponse> => {
  const {
    title,
    authorId,
    description,
    content,
    published,
    publishedAt,
    updatedAt,
    imageURL,
    categoryId,
    tags
  } = post;

  if (!authorId || !title || !content) {
    throw new AppError(
      'Bad Request: Missing required post fields.',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  // const parsedDate: Date = new Date(publishedAt);
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  const postSlug = await generateUniqueSlug(baseSlug);

  return db.post.create({
    data: {
      title,
      authorId,
      slug: postSlug,
      description,
      content,
      categoryId: categoryId || null,
      published,
      publishedAt,
      updatedAt,
      imageURL,
      tags
    },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      published: true,
      publishedAt: true,
      tags: true,
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
  slug: string,
  userId: string,
  post: PostUpload
): Promise<PostResponse> => {
  const { title, description, content, published, updatedAt, categoryId, tags } = post;

  const existingPost = await db.post.findFirst({
    where: { slug },
    select: { id: true, authorId: true, title: true, slug: true },
  });

  if (!existingPost) {
    throw new AppError('Post not found', HttpStatusCodes.NOT_FOUND);
  }

  const postId = existingPost.id;

  if (existingPost.authorId !== userId) {
    throw new AppError(
      'Forbidden: You are not the author of this post.',
      HttpStatusCodes.FORBIDDEN
    );
  }

  let postSlug = existingPost.slug;

  if (title && title !== existingPost.title) {
    const baseSlug = slugify(title, { lower: true, strict: true, trim: true });
    postSlug = await generateUniqueSlug(baseSlug, postId);
  }

  return db.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      description,
      content,
      updatedAt,
      published,
      categoryId: categoryId || null,
      tags,
      ...(title && title !== existingPost.title && { slug: postSlug }),
    },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      content: true,
      published: true,
      publishedAt: true,
      updatedAt: true,
      tags:true,
      category: {
        select: {
          id:true, name:true
        }
      },
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

/*
router.get("/post/:slug", async (req, res) => {
  let foundResource = await Resources.findOne({ slug: req.params.slug });
  var metaTitle = foundResource.title;
  
  if(foundResource){
    let allResources = await Resources.find({});
    res.render("insider/show"), {Resources: allResources, resource: findResouce, other data...}
    } 
  }
)
*/
