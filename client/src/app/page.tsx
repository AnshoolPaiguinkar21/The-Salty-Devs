import Link from "next/link";

const mockPosts = [
  {
    slug: 'type-safe-api-with-prisma',
    title: 'Building a Type-Safe API with Prisma and tRPC',
    date: 'August 18, 2025',
    excerpt: 'Moving beyond traditional REST. How combining Prisma\'s database safety with tRPC\'s end-to-end type safety can eliminate entire classes of bugs...',
  },
  {
    slug: 'the-new-wave-of-css',
    title: 'The New Wave of CSS',
    date: 'July 22, 2025',
    excerpt: 'A look at modern CSS features that are changing the way we build layouts and design systems: container queries, the `:has()` selector, and cascade layers.',
  },
  {
    slug: 'server-components-in-nextjs-14',
    title: 'Server Components in Next.js 14: A Practical Guide',
    date: 'June 15, 2025',
    excerpt: 'Moving beyond the theory. A step-by-step guide to refactoring a client-side rendered app to leverage the power of React Server Components for better performance.',
  },
];

export default function Home() {
  return (
    <main className="py-10">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tighter header-text">From the Command Line</h1>
        <p className="mt-4 text-lg subtle-text max-w-2xl mx-auto">Notes on building modern software, from backend architecture to frontend performance.</p>
      </div>

      <div className="space-y-8">
        {mockPosts.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.slug} className="block p-8 rounded-xl card-hover-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <h2 className="text-2xl font-bold header-text">{post.title}</h2>
              <p className="md:ml-4 mt-2 md:mt-0 text-sm subtle-text flex-shrink-0">{post.date}</p>
            </div>
            <p className="mt-3 body-text">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
