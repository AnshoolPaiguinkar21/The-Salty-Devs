// Represents the author of a post or a comment
export interface Author {
  id: string;
  name: string | null;
  email: string;
  bio?: string | null;
}

// Represents a user in the system (for admin operations)
export interface User {
  id: string;
  name: string | null;
  email: string;
  bio?: string | null;
  role: 'ADMIN' | 'USER';
  createdAt?: string;
  updatedAt?: string;
}

// Represents the response from login API
export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

// Represents a single comment on a post
export interface Comment {
  id: string;
  content: string;
  createdAt: string; // Or Date if you plan to parse it
  editedAt: string | null; // Or Date
  author: Author;
}

// Represents a category
export interface Category {
  id: string;
  name: string;
  posts?: Post[];
}

// Represents a single post object
export interface Post {
  id: string;
  title: string;
  slug: string | null;
  description?: string | null;
  content: string | null;
  category?: Category | null; // NEW: Added category property
  views?: number | null;
  publishedAt: string | null; // Can be null
  updatedAt?: string; // Or Date
  createdAt?: string;
  published?: boolean;
  imageURL?: string | null; // Can be null
  author: Author;
  comments?: Comment[];
  tags?: string[];
}
