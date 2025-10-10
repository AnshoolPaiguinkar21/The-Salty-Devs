'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  author: {
    name: string;
  };
  category?: {
    name: string;
  };
  published: boolean;
  views: number;
  publishedAt?: string;
  createdAt: string;
}

interface ArticleListProps {
  articles: Article[];
  onDelete?: (id: string) => void;
}

const ArticleList = ({ articles, onDelete }: ArticleListProps) => {
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      onDelete?.(id);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                No articles found.
              </TableCell>
            </TableRow>
          ) : (
            articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/admin/articles/${article.id}`}
                    className="hover:underline"
                  >
                    {article.title}
                  </Link>
                </TableCell>
                <TableCell>{article.author.name}</TableCell>
                <TableCell>
                  {article.category ? (
                    <Badge variant="outline">{article.category.name}</Badge>
                  ) : (
                    <span className="text-muted-foreground">Uncategorized</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={article.published ? 'default' : 'secondary'}>
                    {article.published ? 'Published' : 'Draft'}
                  </Badge>
                </TableCell>
                <TableCell>{article.views.toLocaleString()}</TableCell>
                <TableCell>
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString()
                    : '-'}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/articles/${article.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/articles/${article.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(article.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArticleList;
