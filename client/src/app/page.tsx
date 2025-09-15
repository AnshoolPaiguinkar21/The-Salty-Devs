import React from 'react';

const mockPosts = [
  {
    slug: 'type-safe-api-with-prisma',
    title: 'Building a Type-Safe API with Prisma and tRPC',
    date: 'August 18, 2025',
    excerpt:
      "Moving beyond traditional REST. How combining Prisma's database safety with tRPC's end-to-end type safety can eliminate entire classes of bugs...",
  },
  {
    slug: 'the-new-wave-of-css',
    title: 'The New Wave of CSS',
    date: 'July 22, 2025',
    excerpt:
      'A look at modern CSS features that are changing the way we build layouts and design systems: container queries, the `:has()` selector, and cascade layers.',
  },
  {
    slug: 'server-components-in-nextjs-14',
    title: 'Server Components in Next.js 14: A Practical Guide',
    date: 'June 15, 2025',
    excerpt:
      'Moving beyond the theory. A step-by-step guide to refactoring a client-side rendered app to leverage the power of React Server Components for better performance.',
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to The Salty Devs</h1>
      <p className="text-lg text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta urna
        vulputate elit porta dapibus. Fusce consectetur egestas lorem, quis
        iaculis arcu pretium ut. Ut justo leo, accumsan a dolor et, cursus
        eleifend urna. Nullam consequat nec lorem pretium laoreet. In a neque
        justo. Phasellus a eros venenatis, tristique justo id, convallis sem.
        Vivamus non turpis enim. Aliquam erat volutpat. Sed tincidunt sapien
        placerat laoreet pretium. Morbi in odio pharetra, blandit nunc at,
        sodales justo. Vestibulum aliquam nisi quis nulla tempus, et vulputate
        nulla accumsan. Fusce accumsan venenatis mauris, ac rhoncus nunc gravida
        et. Aliquam erat volutpat. Mauris ut hendrerit magna, vitae vestibulum
        augue. Phasellus auctor erat in feugiat ullamcorper. Duis quis ultrices
        enim. Nam lacinia ex orci, quis iaculis diam venenatis vel. Nunc
        condimentum ipsum vel purus blandit dapibus non et quam. Sed nec arcu id
        sem imperdiet auctor. Praesent sit amet tortor dignissim, ullamcorper
        dolor ullamcorper, fermentum libero. Curabitur et ante tempor, elementum
        neque nec, aliquet urna. Nam quis tellus malesuada, eleifend mi eget,
        hendrerit turpis. Integer ex ipsum, tincidunt quis faucibus et, mattis
        eget odio. Proin eget dui tristique, luctus velit id, dapibus sapien.
        Sed ultricies facilisis urna, et suscipit augue laoreet eu. Duis maximus
        nunc a elit pharetra, nec vulputate arcu varius. Nulla interdum lectus
        laoreet, tincidunt dolor sed, pretium lorem. Maecenas facilisis tempus
        sapien et consectetur. Nam et felis pellentesque, faucibus metus id,
        accumsan magna. Curabitur ac maximus nisl, nec lobortis leo. In eget
        lorem neque. Class aptent taciti sociosqu ad litora torquent per conubia
        nostra, per inceptos himenaeos. In ultrices, magna at vehicula
        pellentesque, tellus nibh ultricies mi, at placerat massa nibh a leo.
        Donec at mauris neque. Sed dignissim sollicitudin magna, commodo iaculis
        lectus ullamcorper ut. Duis posuere risus ut nibh blandit eleifend.
        Aenean ornare viverra ex quis dapibus. In vel metus eget neque ultrices
        eleifend. In nec dui orci. Morbi ultrices luctus urna id tincidunt.
      </p>
    </div>
  );
}
