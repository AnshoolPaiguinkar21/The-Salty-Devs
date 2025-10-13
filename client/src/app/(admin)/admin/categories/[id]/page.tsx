// Edit category page
// This will allow editing of a specific category

interface CategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      <p className="text-muted-foreground">Category ID: {id}</p>
      <p className="mt-4">Category edit interface will be implemented here.</p>
    </div>
  );
}
