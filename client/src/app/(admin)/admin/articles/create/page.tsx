'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ArticleForm from '@/components/admin/ArticleManager/ArticleForm';

export default function CreateArticle() {
  const router = useRouter();

  const mockCategories = [
    { id: '1', name: 'Web Development' },
    { id: '2', name: 'Programming' },
    { id: '3', name: 'Backend' },
    { id: '4', name: 'Frontend' },
  ];

  const handleSubmit = (data: any) => {
    console.log('Creating article:', data);
    // Here you would call your API to create the article
    // For now, just redirect back to articles list
    router.push('/admin/articles');
  };

  const handleCancel = () => {
    router.push('/admin/articles');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Article</h1>
        <p className="text-muted-foreground">
          Write and publish a new article for your blog.
        </p>
      </div>

      <ArticleForm
        mode="create"
        categories={mockCategories}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
