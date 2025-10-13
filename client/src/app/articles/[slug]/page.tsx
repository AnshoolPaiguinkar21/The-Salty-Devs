import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Eye, User } from 'lucide-react';
import Link from 'next/link';
import { getPost } from '@/lib/api';
import { notFound } from 'next/navigation';

interface ArticlesProps {
  params: Promise<{
    slug: string;
  }>;
}

const Articles = async ({ params }: ArticlesProps) => {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <article className="prose prose-gray dark:prose-invert max-w-none">
            <div className="mb-8">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                {post.category && (
                  <Badge variant="secondary">{post.category.name}</Badge>
                )}
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {post.views || 0}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author.name || 'Anonymous'}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString()
                    : 'Not published'}
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {post.content && (
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/\n/g, '<br/>')
                    .replace(/^/, '<p>')
                    .replace(/$/, '</p>')
                    .replace(/## (.*?)<\/p>/g, '</p><h2>$1</h2><p>')
                    .replace(/### (.*?)<\/p>/g, '</p><h3>$1</h3><p>')
                    .replace(/- (.*?)<br\/>/g, '<li>$1</li>')
                    .replace(/<p><li>/g, '<ul><li>')
                    .replace(/<\/li><\/p>/g, '</li></ul>'),
                }}
              />
            )}
          </article>
        </div>
      </main>
    </div>
  );
};

export default Articles;
