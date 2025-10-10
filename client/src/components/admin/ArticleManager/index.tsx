'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import ArticleList from './ArticleList';

// Mock data - replace with real API calls
const mockArticles = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14',
    author: { name: 'John Doe' },
    category: { name: 'Web Development' },
    published: true,
    views: 1234,
    publishedAt: '2024-01-15',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    author: { name: 'Jane Smith' },
    category: { name: 'Programming' },
    published: false,
    views: 0,
    publishedAt: undefined,
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    title: 'Building Scalable APIs',
    author: { name: 'Mike Johnson' },
    category: { name: 'Backend' },
    published: true,
    views: 856,
    publishedAt: '2024-01-13',
    createdAt: '2024-01-13',
  },
];

const ArticleManager = () => {
  const [articles, setArticles] = useState(mockArticles);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setArticles((prev) => prev.filter((article) => article.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Articles</h1>
          <p className="text-muted-foreground">
            Manage your blog articles and content.
          </p>
        </div>
        <Link href="/admin/articles/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Article
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Articles List */}
      <Card>
        <CardHeader>
          <CardTitle>All Articles ({filteredArticles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <ArticleList articles={filteredArticles} onDelete={handleDelete} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleManager;
