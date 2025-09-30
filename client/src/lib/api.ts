import { Post } from '@/types';

// The base URL of your backend API
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

/**
 * Fetches all published posts from the backend.
 */
export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      // Improve performance by re-fetching data every 60 seconds
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts: Post[] = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    // In a real app, you'd handle this error more gracefully
    return []; // Return an empty array on error
  }
}
