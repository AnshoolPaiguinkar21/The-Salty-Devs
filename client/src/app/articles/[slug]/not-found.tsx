import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileX } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <FileX className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-4xl font-bold mb-2">Article Not Found</h1>
          <p className="text-muted-foreground">
            The article you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
        </div>

        <Link href="/">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
