'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ArticleForm from '@/components/admin/ArticleManager/ArticleForm';

interface EditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');

  React.useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  const mockCategories = [
    { id: '1', name: 'Web Development' },
    { id: '2', name: 'Programming' },
    { id: '3', name: 'Backend' },
    { id: '4', name: 'Frontend' },
  ];

  // Mock initial data - replace with real API call
  const initialData = {
    title: 'Getting Started with Next.js 14',
    content: 'This is the content of the article...',
    description: 'A comprehensive guide to Next.js 14',
    categoryId: '1',
    tags: ['nextjs', 'react', 'web-development'],
    published: true,
  };

  const handleSubmit = (data: any) => {
    console.log('Updating article:', id, data);
    // Here you would call your API to update the article
    // For now, just redirect back to articles list
    router.push('/admin/articles');
  };

  const handleCancel = () => {
    router.push('/admin/articles');
  };

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Article</h1>
        <p className="text-muted-foreground">
          Update your article content and settings.
        </p>
      </div>

      <ArticleForm
        articleId={id}
        mode="edit"
        initialData={initialData}
        categories={mockCategories}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
