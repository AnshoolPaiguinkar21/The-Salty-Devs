import { Post, Category, User, LoginResponse } from '@/types';

// The base URL of your backend API
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  // In a real app, you'd get the token from cookies or localStorage
  // For now, we'll assume the token is in cookies and sent automatically
  return {
    'Content-Type': 'application/json',
  };
};

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

// ============================================================================
// ADMIN API FUNCTIONS
// ============================================================================

/**
 * Admin: Fetches all posts (including unpublished) for admin dashboard
 */
export async function getAdminPosts(): Promise<{
  posts: Post[];
  totalCount: number;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      headers: getAuthHeaders(),
      credentials: 'include', // Include cookies for authentication
    });

    if (!response.ok) {
      throw new Error('Failed to fetch admin posts');
    }

    const responseData = await response.json();
    return {
      posts: responseData.data,
      totalCount: responseData.totalCount,
    };
  } catch (error) {
    console.error('Error fetching admin posts:', error);
    return { posts: [], totalCount: 0 };
  }
}

/**
 * Admin: Creates a new post
 */
export async function createPost(postData: {
  title: string;
  content: string;
  description: string;
  categoryId: string;
  published: boolean;
  tags?: string[];
}): Promise<Post | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Failed to create post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
}

/**
 * Admin: Updates an existing post
 */
export async function updatePost(
  slug: string,
  postData: {
    title: string;
    content: string;
    description: string;
    categoryId: string;
    published: boolean;
    tags?: string[];
  }
): Promise<Post | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/update/${slug}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Failed to update post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating post:', error);
    return null;
  }
}

/**
 * Admin: Deletes a post
 */
export async function deletePost(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    return response.ok;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
}

/**
 * Admin: Creates a new category
 */
export async function createCategory(categoryData: {
  name: string;
}): Promise<Category | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      throw new Error('Failed to create category');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating category:', error);
    return null;
  }
}

/**
 * Admin: Updates an existing category
 */
export async function updateCategory(
  id: string,
  categoryData: {
    name: string;
  }
): Promise<Category | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      throw new Error('Failed to update category');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating category:', error);
    return null;
  }
}

/**
 * Admin: Deletes a category
 */
export async function deleteCategory(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    return response.ok;
  } catch (error) {
    console.error('Error deleting category:', error);
    return false;
  }
}

/**
 * Admin: Fetches all users
 */
export async function getAdminUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/all`, {
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

/**
 * Admin: Deletes a user
 */
export async function deleteUser(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    return response.ok;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
}

/**
 * Admin: Updates a user
 */
export async function updateUser(
  id: string,
  userData: {
    name: string;
    email: string;
    role: string;
  }
): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}

/**
 * Authentication: Login user
 */
export async function loginUser(credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    return await response.json();
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
}

/**
 * Authentication: Register new user
 */
export async function registerUser(userData: {
  name: string;
  email: string;
  password: string;
}): Promise<LoginResponse | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to register');
    }

    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
    return null;
  }
}

/**
 * Authentication: Get current user info
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/me`, {
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    // Don't log error if it's just a network error (backend not running)
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.warn(
        'Backend server is not running. Please start the server on port 4000.'
      );
    } else {
      console.error('Error getting current user:', error);
    }
    return null;
  }
}

/**
 * Authentication: Logout user
 */
export async function logoutUser(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    return response.ok;
  } catch (error) {
    console.error('Error logging out:', error);
    return false;
  }
}
