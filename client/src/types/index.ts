// Represents the author of a post or a comment
export interface Author {
  id: string;
  name: string;
  email: string;
}

// Represents a single comment on a post
export interface Comment {
  id: string;
  content: string;
  createdAt: string; // Or Date if you plan to parse it
  editedAt: string; // Or Date
  author: Author;
}

// Represents a single post object
export interface Post {
  id: string;
  title: string;
  content: string;
  publishedAt: string | null; // Can be null
  updatedAt: string; // Or Date
  imageURL: string | null; // Can be null
  author: Author;
  comments: Comment[];
}
