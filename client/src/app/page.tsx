import Footer from "@/components/footer/page";
import Navbar from "@/components/navbar/page";

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
    <main className="h-screen flex flex-col justify-between">
      <Navbar />
      <Footer />
    </main>
  );
}
