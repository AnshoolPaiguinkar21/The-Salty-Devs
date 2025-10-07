import {db} from "@utils/db.config.ts";
import { createPost ,getPost, updatePost, deletePost, getPosts, totalPosts} from "@api/Post/post.services.ts";

beforeEach(async () => {
  await db.postViews.deleteMany();
  await db.comment.deleteMany();
  await db.post.deleteMany();
  await db.user.deleteMany();
});
afterAll(async () => {
  await db.$disconnect();
});


describe('Testing the Create Post function', () => { 
    it('Should create a new post', async()=>{
        await db.comment.deleteMany();
        await db.post.deleteMany();
        await db.user.deleteMany();

    const user = await db.user.create({
    data: { 
        name: "Alice", 
        email: "alice@example.com", 
        bio: 'hello',
        password: "123456" ,
        role: "USER"
    },

    });

    const post = await createPost({
      title: "First Post",
      authorId: user.id,
      content: "Hello world!",
      published: true,
      publishedAt: new Date(),
      updatedAt: new Date(),
    
    });

    expect(post).toMatchObject({
      title: "First Post",
      content: "Hello world!",
      published: true,
      author: { 
        id: user.id,
        email: user.email 
        },
    });
        await db.comment.deleteMany();
        await db.post.deleteMany();
        await db.user.deleteMany();
  });

  it("should throw error if required fields are missing", async () => {
        await db.comment.deleteMany();
        await db.post.deleteMany();
        await db.user.deleteMany();

    await expect(
      createPost({
        title: "",
        authorId: "",
        content: "",
        published: true,
        publishedAt: new Date(),
        updatedAt: new Date(),
      })
    ).rejects.toThrow("Bad Request: Missing required post fields.");
        await db.comment.deleteMany();
        await db.post.deleteMany();
        await db.user.deleteMany();
  });
})

describe("Testing the update post function", () => {
  it("should update post if user is the author", async () => {
    await db.comment.deleteMany();
    await db.post.deleteMany();
    await db.user.deleteMany();

    const user = await db.user.create({
      data: { 
        name: "Eve", 
        email: "eve@example.com", 
        bio: "hello",
        password: "123456",
        role: "ADMIN",
      },
    });

    const post = await db.post.create({
      data: { 
        title: "Old Title", 
        content: "Old content", 
        authorId: user.id, 
        published: true, 
        publishedAt: new Date(), 
        updatedAt: new Date(),
        slug: "old-title",  
      },
    });

    const updated = await updatePost(post.slug!, user.id, {
      title: "New Title",
      content: "Updated content",
      published: post.published,
      publishedAt: post.publishedAt,
      updatedAt:new Date(),
      authorId: post.authorId,
    });

    expect(updated.title).toBe("New Title");
    expect(updated.content).toBe("Updated content");

    await db.comment.deleteMany();
    await db.post.deleteMany();
    await db.user.deleteMany();
  });

  it("should throw error if post not found", async () => {
    await db.comment.deleteMany();     
    await db.postViews.deleteMany();  
    await db.post.deleteMany();        
    await db.user.deleteMany();

    const user = await db.user.create({
      data: { 
        name: "Fake", 
        email: "fake@example.com", 
        password: "123456" 
      },
    });

    await expect(
      updatePost("non-existent-slug", user.id, {
        title: "x",
        content: "y",
        published: true,
        publishedAt: new Date(),
        updatedAt:new Date(),
        authorId: user.id,
      })
    ).rejects.toThrow("Post not found");

    await db.comment.deleteMany();     
    await db.postViews.deleteMany();  
    await db.post.deleteMany();        
    await db.user.deleteMany();
  });

  it("should throw forbidden error if user is not author", async () => {
    await db.comment.deleteMany();     
    await db.postViews.deleteMany();  
    await db.post.deleteMany();        
    await db.user.deleteMany();

    const user1 = await db.user.create({
      data: {
        name: "Author", 
        email: "author@example.com", 
        password: "123456" 
      },
    });

    const user2 = await db.user.create({
      data: { 
        name: "Intruder", 
        email: "intruder@example.com", 
        password: "123456" 
      },
    });

    const post = await db.post.create({
      data: { 
        title: "Protected Post", 
        content: "mine", 
        authorId: user1.id, 
        published: true, 
        publishedAt: new Date(), 
        updatedAt: new Date(),
        slug: "protected-post", 
      },
    });

    await expect(
      updatePost(post.slug!, user2.id, { 
        title: "New Title",
        content: "Updated content",
        published: post.published,
        publishedAt: post.publishedAt,
        updatedAt:new Date(),
        authorId: post.authorId,
      })
    ).rejects.toThrow("Forbidden: You are not the author of this post.");

    await db.comment.deleteMany();     
    await db.postViews.deleteMany();  
    await db.post.deleteMany();        
    await db.user.deleteMany();
  });
});


describe('Testing the get Post function', () => {
  it('Should get a post by slug and increment views correctly', async () => {
    await db.postViews.deleteMany();
    await db.comment.deleteMany();
    await db.post.deleteMany();
    await db.user.deleteMany();

    const user = await db.user.create({
      data: {
        name: "Carol",
        email: "carol@example.com",
        bio: 'hello',
        password: "123456",
        role: 'USER'
      },
    });

    const post = await db.post.create({
      data: {
        title: "Viewed Post",
        slug: "viewed-post", 
        content: "test content",
        authorId: user.id,
        published: true,
        publishedAt: new Date(),
        updatedAt: new Date(),
        views: 0
      },
    });

    // First fetch should increment views to 1
    const fetched = await getPost(user.id, post.slug!);
    expect(fetched).not.toBeNull();
    expect(fetched?.id).toBe(post.id);
    expect(fetched?.author.id).toBe(user.id);

    const updatedPost = await db.post.findUnique({ where: { id: post.id } });
    expect(updatedPost?.views).toBe(1);

    // Second fetch by the same user should NOT increment views again
    await getPost(user.id, post.slug!);
    const afterSecondView = await db.post.findUnique({ where: { id: post.id } });
    expect(afterSecondView?.views).toBe(1);

    // Different user -> should increment to 2
    const user2 = await db.user.create({
      data: {
        name: 'Bob',
        email: 'bob@example.com',
        password: '123456',
        role: 'USER'
      },
    });

    await getPost(user2.id, post.slug!);
    const afterThirdView = await db.post.findUnique({ where: { id: post.id } });
    expect(afterThirdView?.views).toBe(2);

    await db.postViews.deleteMany();
    await db.comment.deleteMany();
    await db.post.deleteMany();
    await db.user.deleteMany();
  });
});


describe("Testing the get Posts function", () => {
 
  it("should return published posts with pagination and search", async () => {
    await db.comment.deleteMany();
    await db.post.deleteMany();
    await db.user.deleteMany();
    const user = await db.user.create({
      data: { 
        name: "Bob", 
        email: "bob@example.com", 
        password: "123456" 
      },
    });

    await db.post.createMany({
      data: [
        { title: "AI", content: "AI content", authorId: user.id, published: true, publishedAt: new Date(), updatedAt: new Date() },
        { title: "Web Dev", content: "Web content", authorId: user.id, published: true, publishedAt: new Date(), updatedAt: new Date() },
        { title: "Hidden", content: "Not published", authorId: user.id, published: false, publishedAt: new Date(), updatedAt: new Date() },
      ],
    });

    const result = await getPosts(0, 10, "AI");
    expect(result.totalCount).toBe(2); // Only published posts count
    expect(result.data[0].title).toBe("AI");

    const total = await totalPosts();
    expect(total).toBe(3);

    await db.comment.deleteMany();
    await db.post.deleteMany();
    await db.user.deleteMany();
  });
});

describe("Testing the delete post function", () => {

  it("should delete post and its comments", async () => {
    await db.comment.deleteMany();
    await db.post.deleteMany();
    await db.user.deleteMany();
    const user = await db.user.create({
      data: { 
        name: "Frank", 
        email: "frank@example.com", 
        bio:'hello',
        password: "123456" 
      },
    });

    const post = await db.post.create({
      data: {
         title: "Delete Me", 
         content: "bye", 
         authorId: user.id, 
         published: true, 
         publishedAt: new Date(), 
         updatedAt: new Date() },
    });

    await db.comment.create({
      data: { 
        postId: post.id, 
        authorId: user.id, 
        content: "comment", 
        createdAt: new Date() },
    });

    await deletePost(post.id);

    const foundPost = await db.post.findUnique({ where: { id: post.id } });
    const foundComments = await db.comment.findMany({ where: { postId: post.id } });

    expect(foundPost).toBeNull();
    expect(foundComments.length).toBe(0);

    await db.comment.deleteMany();
    await db.post.deleteMany();
    await db.user.deleteMany();
  });
});



