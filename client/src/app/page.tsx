import React from 'react';
import { getAllPosts } from '@/lib/api';
import PostCard from '@/components/postCard';

export default async function Home() {
  const { posts, totalCount } = await getAllPosts();
  console.log('Total Posts fetched:', totalCount);

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
