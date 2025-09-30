import { fetchUser } from '@api/User/user.services.ts';
import { db } from '@utils/db.config.ts';

test('test db connection', async () => {
  
  await db.user.deleteMany();
 // Insert
  const user = await db.user.create({
    data: { name: 'Test', email: 'test@example.com', bio: 'test bio', password: 'hashed' },
  });

  // Read
  const found = await db.user.findUnique({ where: { id: user.id } });

  expect(found).not.toBeNull();
  expect(found?.email).toBe('test@example.com');

  // Clean up
  await db.user.deleteMany();
});

describe(' Testing for Fetch User function', ()=>{
  it('should fetch user the correct user by id', async()=>{
    await db.user.deleteMany();
    const user1 = await db.user.create({
      data:{
        name: 'Syndroy',
        email: 'syndroyaraujo@gmail.com',
        bio: 'hello',
        password: '12345678',
        role:'USER'
      },
    });
    const user2 = await db.user.create({
      data:{
        name: 'Bob',
        email: 'bob@gmail.com',
        bio: 'hello world',
        password: 'password',
        role: 'USER'
      },
    });
   
    const result = await fetchUser(user1.id); 

    expect(result?.id).toBe(user1.id);
    expect(result?.name).toBe('Syndroy');
    expect(result?.email).toBe('syndroyaraujo@gmail.com');
    expect(result?.bio).toBe('hello');
    expect(result?.role).toBe('USER');
    
    await db.user.deleteMany();
  })

  it('Should return null if the user does not exist', async()=>{
    await db.user.deleteMany();
    const result = await fetchUser
  })
  
})