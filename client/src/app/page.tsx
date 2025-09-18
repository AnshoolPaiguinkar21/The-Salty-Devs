import React from 'react';
import PostCard from '@/components/postCard/page';

const posts = [
  {
    id: '1',
    title: 'Getting Started with React',
    excerpt: 'Learn the basics of React development.',
    date: '2024-01-15',
    slug: 'getting-started-with-react',
    author: 'John Doe',
    tags: ['react', 'javascript'],
  },
  {
    id: '2',
    title: 'Advanced TypeScript Tips',
    excerpt: 'Master TypeScript with these advanced techniques.',
    date: '2024-01-10',
    slug: 'advanced-typescript-tips',
    author: 'Jane Smith',
    tags: ['typescript', 'advanced'],
  },
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Our Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover insights, tutorials, and thoughts on web development, design,
          and technology.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
