import { addCategory, deleteCategory, editCategory } from '@api/Category/category.services.ts';
import { getCategories, getCategory } from '@api/Category/category.services.ts';
import { db } from '@utils/db.config.ts';


describe('Testing the get categories function', ()=>{
    it('Should return the id, name and posts from each category', async()=>{
        await db.category.deleteMany();
        const category1 = await db.category.create({
            data:{
                name:'Technology'
            }
        });
        
        const category2 = await db.category.create({
            data:{
                name:'Science'
            }
        });
        
         const category3 = await db.category.create({
            data:{
                name:'Luxury'
            }
        });

       expect(await getCategories()).not.toBe(null);
    })
})

describe('Testing the get Category function', ()=>{
    it('Should return the the id, name and posts from a single category',async()=>{
        await db.category.deleteMany();
        const category1 = await db.category.create({
            data:{
                name:'Technology'
            }
        });
        
        const category2 = await db.category.create({
            data:{
                name:'Science'
            }
        });
        expect(await getCategory(category1.id)).not.toBe(null);
    })
})

describe('Testing the add category function', ()=>{  
  it('Should add a new category', async()=>{
  await db.category.deleteMany()  
        const newCategory = {
            name: 'Science'  
        }
        expect(await addCategory(newCategory)).not.toBe(null)
    })
    it("should return category with posts when posts are added", async () => {
      await db.post.deleteMany();
      await db.user.deleteMany();
      await db.category.deleteMany();
    const category = await addCategory({ name: "Science" });
    const user = await db.user.create({
      data:{
        name:'Syndroy',
        email:'syndroy@example.com',
        password:'1234455',
        bio:'hello'
      }
    })
    
    const post = await db.post.create({
      data: {
        title: "AI in 2025",
        authorId: user.id,
        content: "AI is changing everything.",
        published: false,
        publishedAt: new Date(),
        updatedAt: new Date(),
        categoryId: category.id
      },
    });
    console.log('checking the post created', post);
    const updatedCategory = await db.category.findUnique({
      where: { id: category.id },
      select: {
        id: true,
        name: true,
        posts: {
          select: {
            id: true,
            title: true,
            content: true,
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
    console.log('checking if the category exists', updatedCategory);

    expect(updatedCategory?.posts.length).toBe(1);
    expect(updatedCategory?.posts[0]).toMatchObject({
      title: "AI in 2025",
      content: "AI is changing everything.",
      author: {
        name: "Syndroy",
        email: "syndroy@example.com",
      },
    
});  await db.post.deleteMany();
      await db.user.deleteMany();
      await db.category.deleteMany();
    });
});

describe('Testing the edit category function', ()=>{
  it('Should update an existing category', async()=>{
      await db.category.deleteMany();
    const category = await addCategory({ name: "Science" });
    
    const updatedCategory = await editCategory(category.id,{name:"Technology"});
    console.log('new category',category)
    console.log('Edited category',updatedCategory)
    expect(updatedCategory).toMatchObject({
      id: category.id,
      name: "Technology"
    });
  })
})

describe('Testing the delete category function', ()=>{
  it('Should delete the category', async()=>{
    await db.category.deleteMany();
    const category = await addCategory({name:'Science'});
    await deleteCategory(category.id);
    const deletedcategory = await db.category.findUnique({where:{id:category.id}})
    expect(deletedcategory).toBeNull()
  })
})