import { Post, Category } from '@/types';

// The base URL of your backend API
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

/**
 * Fetches all published posts from the backend.
 */
export async function getAllPosts(): Promise<{
  posts: Post[];
  totalCount: number;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      // Improve performance by re-fetching data every 60 seconds
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const responseData = await response.json();
    return {
      posts: responseData.data, // Extract the 'data' array
      totalCount: responseData.totalCount,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    // In a real app, you'd handle this error more gracefully
    return { posts: [], totalCount: 0 }; // Return an empty array on error
  }
}

/**
 * Fetches all published posts sorted by latest first (for articles page).
 */
export async function getAllPostsSortedByLatest(): Promise<{
  posts: Post[];
  totalCount: number;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?sortBy=latest`, {
      // Improve performance by re-fetching data every 60 seconds
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const responseData = await response.json();
    return {
      posts: responseData.data, // Extract the 'data' array
      totalCount: responseData.totalCount,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    // In a real app, you'd handle this error more gracefully
    return { posts: [], totalCount: 0 }; // Return an empty array on error
  }
}

/**
 * Fetches popular posts sorted by views (for home page).
 */
export async function getPopularPosts(): Promise<{
  posts: Post[];
  totalCount: number;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?sortBy=popular`, {
      // Improve performance by re-fetching data every 60 seconds
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const responseData = await response.json();
    return {
      posts: responseData.data, // Extract the 'data' array
      totalCount: responseData.totalCount,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    // In a real app, you'd handle this error more gracefully
    return { posts: [], totalCount: 0 }; // Return an empty array on error
  }
}

/**
 * Fetches a single post by its slug from the backend.
 */
export async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${slug}`, {
      // Improve performance by re-fetching data every 60 seconds
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Post not found
      }
      throw new Error('Failed to fetch post');
    }

    const post = await response.json();
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null; // Return null on error
  }
}

/**
 * Fetches all categories with their associated posts from the backend.
 */
export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      // Improve performance by re-fetching data every 60 seconds
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return []; // Return empty array on error
  }
}
