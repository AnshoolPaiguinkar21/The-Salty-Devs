import { db } from "@utils/db.config.ts";
import { getCommentsByPost, getComment, addComment, editComment, deleteComment, totalComments} from "@api/Comments/comments.services.ts";

beforeEach(async () => {
  await db.postViews.deleteMany();
  await db.comment.deleteMany();
  await db.post.deleteMany();
  await db.user.deleteMany();
});
afterAll(async () => {
  await db.$disconnect();
});


describe('Testing the add comment, total comments, get comment by id and get comments by post functions', ()=>{
it('should add a comment, get a comment by id and get all comments on a post by pagination and the total comments', async()=>{
    await db.comment.deleteMany();
    await db.post.deleteMany();
    await db.user.deleteMany();

   const user = await db.user.create({
      data:{
        name: 'Syndroy',
        email: 'syndroyaraujo@gmail.com',
        bio: 'hello',
        password: '12345678',
        role:'USER'
      },
    });
    
   const post = await db.post.create({
      data: {
        title: "First Post",
        content: "Hello World!",
        authorId: user.id,
        published: true,
        publishedAt: new Date(),
        updatedAt: new Date(),
      },
    });

  
    const comment = await addComment({
      postId: post.id,
      authorId: user.id,
      content: "This is my first comment",
      createdAt: new Date(),
    });
     console.log("Comment 1:", comment);

     const comment1 = await addComment({
      postId: post.id,
      authorId: user.id,
      content: "This is my second comment",
      createdAt: new Date(),
    });
    console.log("Comment 2:", comment1);

    expect(comment).toMatchObject({
      content: "This is my first comment",
      author: {
        id: user.id,
        name: "Syndroy",
        email: "syndroyaraujo@gmail.com",
      },
    });
     const found = await getComment(comment.id);
    expect(found).not.toBeNull();
    expect(found?.id).toBe(comment.id);
  
    const comments = await getCommentsByPost(post.id, 0, 10);
    console.log("Comments for Post:", comments);
    expect(comments.totalComments).toBe(2);
    expect(comments.data[0].post?.id).toBe(post.id);
    expect(comments.data[1].post?.id).toBe(post.id);
    expect(comments.data[0].id).toBe(comment.id);
    expect(comments.data[1].id).toBe(comment1.id);

    const total = await totalComments();
    expect(total).toBe(2);

    await db.comment.deleteMany();
    await db.post.deleteMany();
    await db.user.deleteMany();

    });
it("should throw an error if postId is missing", async () => {
     await db.comment.deleteMany();
    await db.post.deleteMany();
    await db.user.deleteMany();

    const user = await db.user.create({
      data: { 
        name: "Test",
         email: "test@example.com", 
         password: "123456", 
         role: "USER" },
    });

    await expect(
      addComment({
        postId: "",
        authorId: user.id,
        content: "Invalid comment",
        createdAt: new Date(),
      })
    ).rejects.toThrow("Bad Request: Missing required comment fields");
    await db.comment.deleteMany();
    await db.post.deleteMany();
    await db.user.deleteMany();

});

it("should throw an error if authorId is missing", async () => {
    await db.comment.deleteMany();
    await db.post.deleteMany();
    await db.user.deleteMany();

    const user = await db.user.create({
      data: { 
        name: "Test",
         email: "test@example.com", 
         password: "123456", 
         role: "USER" },
    });
    
    const post = await db.post.create({
      data: {
        title: " New Post",
        content: "no author here",
        authorId: user.id,
        published: true,
        publishedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    await expect(
      addComment({
        postId: post.id,
        authorId: "",
        content: "Invalid comment",
        createdAt: new Date(),
      })
    ).rejects.toThrow("Bad Request: Missing required comment fields");
    await db.comment.deleteMany();
    await db.post.deleteMany();
    await db.user.deleteMany();

});

it("should throw an error if content is missing", async () => {
     await db.comment.deleteMany();
    await db.post.deleteMany();
    await db.user.deleteMany();

    const user = await db.user.create({
      data: { 
        name: "Empty",
         email: "empty@example.com", 
         password: "123456",
          role: "USER" },
    });

    const post = await db.post.create({
      data: {
        title: "Silent Post",
        content: "no comment content",
        authorId: user.id,
        published: true,
        publishedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    await expect(
      addComment({
        postId: post.id,
        authorId: user.id,
        content: "", 
        createdAt: new Date(),
      })
    ).rejects.toThrow("Bad Request: Missing required comment fields");
    await db.comment.deleteMany();
    await db.post.deleteMany();
    await db.user.deleteMany();  
});
});
describe('Testing the Edit comment function',()=>{
    it('Should edit a comment if the user is the author', async()=>{
        await db.comment.deleteMany();
        await db.post.deleteMany();
        await db.user.deleteMany();

    const user = await db.user.create({
      data:{
        name: 'Syndroy',
        email: 'syndroyaraujo@gmail.com',
        bio: 'hello',
        password: '12345678',
        role:'USER'
      },
    });
    
   const post = await db.post.create({
      data: {
        title: "First Post",
        content: "Hello World!",
        authorId: user.id,
        published: true,
        publishedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const comment = await addComment({
      postId: post.id,
      authorId: user.id,
      content: "This is my first comment",
      createdAt: new Date(),
    });
    const edited = await editComment(comment.id, user.id, {
      content: "Edited comment",
      postId: post.id,
      authorId: user.id,
      createdAt: comment.createdAt,
    });
    console.log('Edited comment',edited);
    expect(edited.content).toBe("Edited comment");

        await db.comment.deleteMany();
        await db.post.deleteMany();
        await db.user.deleteMany();
    })
})

describe('Testing the delete comment function', ()=>{
    it('should delete a comment if the user us the author', async()=>{
        await db.comment.deleteMany();
        await db.post.deleteMany();
        await db.user.deleteMany();

        const user = await db.user.create({
      data:{
        name: 'Syndroy',
        email: 'syndroyaraujo@gmail.com',
        bio: 'hello',
        password: '12345678',
        role:'USER'
      },
    });
    
   const post = await db.post.create({
      data: {
        title: "First Post",
        content: "Hello World!",
        authorId: user.id,
        published: true,
        publishedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const comment = await addComment({
      postId: post.id,
      authorId: user.id,
      content: "This is my first comment",
      createdAt: new Date(),
    });
    await deleteComment(comment.id, user.id);
    const deleted = await getComment(comment.id);
    expect(deleted).toBeNull();

    await db.comment.deleteMany();
    await db.post.deleteMany();
    await db.user.deleteMany();
    })
    
})


