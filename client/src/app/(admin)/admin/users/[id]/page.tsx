// View/edit specific user page
// This will show user details and allow editing

interface UserPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <p className="text-muted-foreground">User ID: {id}</p>
      <p className="mt-4">User view/edit interface will be implemented here.</p>
    </div>
  );
}
