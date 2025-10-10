import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Users,
  Eye,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Plus,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  // Mock data - replace with real API calls
  const stats = [
    {
      title: 'Total Articles',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: FileText,
    },
    {
      title: 'Total Users',
      value: '1,234',
      change: '+5%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Page Views',
      value: '12,345',
      change: '+18%',
      trend: 'up',
      icon: Eye,
    },
    {
      title: 'Comments',
      value: '89',
      change: '-3%',
      trend: 'down',
      icon: MessageSquare,
    },
  ];

  const recentArticles = [
    {
      id: '1',
      title: 'Getting Started with Next.js 14',
      author: 'John Doe',
      status: 'published',
      views: 1234,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'Advanced TypeScript Patterns',
      author: 'Jane Smith',
      status: 'draft',
      views: 0,
      createdAt: '2024-01-14',
    },
    {
      id: '3',
      title: 'Building Scalable APIs',
      author: 'Mike Johnson',
      status: 'published',
      views: 856,
      createdAt: '2024-01-13',
    },
  ];

  const recentComments = [
    {
      id: '1',
      content: 'Great article! Very helpful for beginners.',
      author: 'Alice Brown',
      article: 'Getting Started with Next.js 14',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      content: 'Could you add more examples?',
      author: 'Bob Wilson',
      article: 'Advanced TypeScript Patterns',
      createdAt: '2024-01-14',
    },
    {
      id: '3',
      content: 'This solved my problem, thank you!',
      author: 'Carol Davis',
      article: 'Building Scalable APIs',
      createdAt: '2024-01-13',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your blog.
          </p>
        </div>
        <Link href="/admin/articles/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Article
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Articles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Articles
              <Link href="/admin/articles">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentArticles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between border-b pb-2 last:border-b-0"
                >
                  <div className="flex-1">
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="font-medium hover:underline"
                    >
                      {article.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      by {article.author} • {article.views} views
                    </p>
                  </div>
                  <Badge
                    variant={
                      article.status === 'published' ? 'default' : 'secondary'
                    }
                  >
                    {article.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Comments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Comments
              <Link href="/admin/comments">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComments.map((comment) => (
                <div key={comment.id} className="border-b pb-2 last:border-b-0">
                  <p className="text-sm">{comment.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    by {comment.author} on {comment.article}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
