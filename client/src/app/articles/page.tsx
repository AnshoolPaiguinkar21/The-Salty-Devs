import React from 'react';
import { getAllPostsSortedByLatest } from '@/lib/api';
import PostCard from '@/components/postCard';

const Articles = async () => {
  const { posts, totalCount } = await getAllPostsSortedByLatest();
  console.log('Total Articles fetched:', totalCount);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">All Articles</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Browse through all our articles, sorted from latest to oldest.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No articles found. Check back later for new content!
          </p>
        </div>
      )}
    </main>
  );
};

export default Articles;
