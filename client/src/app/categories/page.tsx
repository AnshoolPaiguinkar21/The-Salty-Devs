import React from 'react';
import { getAllCategories } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, BookOpen, FileText } from 'lucide-react';
import Link from 'next/link';

export default async function Categories() {
  const categories = await getAllCategories();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Link href="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Article Categories
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our articles organized by topics and categories
            </p>
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">
                No Categories Found
              </h2>
              <p className="text-muted-foreground">
                Categories will appear here once articles are published.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {category.name}
                      </CardTitle>
                      <Badge variant="secondary" className="ml-2">
                        {category.posts?.length || 0} articles
                      </Badge>
                    </div>
                    <CardDescription>
                      Discover articles in {category.name.toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {category.posts && category.posts.length > 0 ? (
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">
                          Recent Articles:
                        </h4>
                        {category.posts.slice(0, 3).map((post) => (
                          <Link
                            key={post.id}
                            href={`/articles/${post.slug}`}
                            className="block group/post"
                          >
                            <div className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
                              <FileText className="w-4 h-4 mt-0.5 text-muted-foreground group-hover/post:text-primary transition-colors" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium line-clamp-2 group-hover/post:text-primary transition-colors">
                                  {post.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {post.publishedAt
                                    ? new Date(
                                        post.publishedAt
                                      ).toLocaleDateString()
                                    : 'Draft'}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                        {category.posts.length > 3 && (
                          <p className="text-xs text-muted-foreground text-center pt-2">
                            +{category.posts.length - 3} more articles
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No articles in this category yet.
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
