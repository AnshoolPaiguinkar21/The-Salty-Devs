import React from 'react';
import Link from 'next/link';
import { Eye, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    slug: string;
    author: string;
    category?: string;
    tags?: string[];
    viewCount?: number;
  };
}

const PostCard = ({ post }: PostCardProps) => {
  const {
    title,
    excerpt,
    date,
    slug,
    author,
    category = 'General',
    tags = [],
    viewCount = 0,
  } = post;
  return (
    <Link href={`/articles/${slug}`}>
      <article className="group bg-card border border-border p-6 hover:gradient-border transition-all duration-300 h-full flex flex-col">
        <div className="space-y-4 flex-1">
          {/* Category and View Count */}
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
            {viewCount > 0 && (
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Eye className="h-3 w-3" />
                <span>{viewCount.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-card-foreground group-hover:gradient-text transition-colors line-clamp-2">
            {title}
          </h2>

          {/* Excerpt */}
          <p className="text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {excerpt}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-border space-y-3">
          {/* Author and Date */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-secondary-foreground">
              <User className="h-3 w-3" />
              <span>{author}</span>
            </div>
            <time className="text-secondary-foreground font-mono">{date}</time>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
