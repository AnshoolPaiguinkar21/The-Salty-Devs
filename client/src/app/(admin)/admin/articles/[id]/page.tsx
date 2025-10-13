// View/edit specific article page
// This will show article details and allow editing

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Article Details</h1>
      <p className="text-muted-foreground">Article ID: {id}</p>
      <p className="mt-4">
        Article view/edit interface will be implemented here.
      </p>
    </div>
  );
}
