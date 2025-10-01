import { fetchUser } from '@api/User/user.services.ts';
import { fetchUsers } from '@api/User/user.services.ts';
import { createUser } from '@api/User/user.services.ts';
import { signinUser } from '@api/User/user.services.ts';
import { updateUser } from '@api/User/user.services.ts';
import { db } from '@utils/db.config.ts';
import bcrypt from 'bcrypt';


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
describe('Testing the fetch Users function',()=>{

  it('Should fetch all users', async()=>{
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
    await expect(await fetchUsers()).not.toBe(null);
    console.log('Testing Fetchusers',fetchUsers())
    await expect(await fetchUsers()).toEqual([
      {
        id: user1.id,
        name: 'Syndroy',
        email: 'syndroyaraujo@gmail.com',
        bio: 'hello',
        role: 'USER'
      },
      {
      id:user2.id,
      name: 'Bob',
      email: 'bob@gmail.com',
      bio: 'hello world',
      role: 'USER'
    },
    ]);
    await db.user.deleteMany();
  })

  it('Should return null if the user does not exist',async()=>{
    await db.user.deleteMany();
     await expect(await fetchUsers()).toEqual([]);
  })
})


describe(' Testing the Fetch User function', ()=>{
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
    await expect( await fetchUser('')).toBe(null);
    await db.user.deleteMany();
  })
  
})

describe('Testing the Create User function',()=>{
  it('Should return a User exists error if the email id already exists', async()=>{
    await db.user.deleteMany();
    const user = await db.user.create({
      data:{
        name: 'Syndroy',
        email: 'syndroyaraujo@gmail.com',
        password: '12345678',
        bio: 'hello'
      },
    });
    const userData = {
      name: 'Syndroy',
        email: 'syndroyaraujo@gmail.com',
        password: '12345678',
        bio: 'hello'
    }
    await expect(createUser(userData)).rejects.toThrow('Email already exists');
    await db.user.deleteMany();
  })

  it('Should hash the password', async()=>{
    await db.user.deleteMany();
    const userData = {
      name: 'Bob',
        email: 'Bob@gmail.com',
        password: '12345678',
        bio: 'hello'
    }
    await createUser(userData);
    const dbUser = await db.user.findUnique({
    where: { 
      email: userData.email
     }, 
    });
    expect(dbUser?.password).not.toBe(userData.password)
    const isValid = await bcrypt.compare(userData.password,dbUser!.password) 
    expect(isValid).toBe(true)   
    await db.user.deleteMany();
  })
})

describe('Testing the Signin User function',()=>{
  it('Should return "User does not Exist" if the email id does not exist in the databse', async()=>{
    await db.user.deleteMany();
   const invalidCredentials = {
    email:'araujo@gmail.com',
    password:'231i3u4u2'
   }
  
    await expect(signinUser(invalidCredentials)).rejects.toThrow('User does not exist');
  })
  it('Should return "Invalid Credentials. Please try again" when the hashed password does not match', async()=>{
    const hashedPassword = await bcrypt.hash('correctPassword', 10);
    await db.user.create({
      data: {
        name: 'Araujo',
        email: 'araujo@gmail.com',
        password: hashedPassword,
        bio: 'hi',
      }
  })
  const invalidPassword = {
    email:'araujo@gmail.com',
    password:'wrongpassword'
  }
   await expect(signinUser(invalidPassword)).rejects.toThrow('Invalid Credentials. Please try again');
})
it('Should return both access token and refresh token along with a user object', async()=>{
   await db.user.deleteMany();
   const plainPassword = 'correctPassword';
   const hashedPassword = await bcrypt.hash(plainPassword, 10);

    
    const user = await db.user.create({
      data: {
        name: 'Alice',
        email: 'alice@gmail.com',
        password: hashedPassword,
        bio: 'hello',
      },
    });

    const validCredentials = {
      email:'alice@gmail.com',
      password: plainPassword
    }
    const result = await signinUser(validCredentials);

    expect(result.token).toBeDefined();
    expect(result.refreshToken).toBeDefined();

    expect(result.user).toEqual({
      id: user.id,
      name: 'Alice',
      email: 'alice@gmail.com',
      bio: 'hello',
      role: user.role,
    });
    await db.user.deleteMany();
})
});

describe('Testing the Update User function', ()=>{
  it('Should update the user fields when id exists',async()=>{
    await db.user.deleteMany();

    const user = await db.user.create({
      data:{
        name: 'Alice',
        email: 'alice@gmail.com',
        password:'12345678',
        bio: 'hello',
      }
    })
    const updatedUser = await updateUser(user.id, {
      name: 'Alice Updated',
      bio: 'updated bio',
    });

  
    expect(updatedUser).toMatchObject({
      id: user.id,
      name: 'Alice Updated',
      email: 'alice@gmail.com',
      bio: 'updated bio',
    });
    await db.user.deleteMany();
  })
  it('should return an empty string if user id is wrong', async()=>{
    await db.user.deleteMany();
    const fakeId = 'abcd';
    await expect(updateUser(fakeId,{
      name:'Syndroy',
      bio:'Updated my bio'
    })).rejects.toThrow('');
  })
})

// describe('Testing the Update Password function', ()=>{
//   it('Should return User not found when the user id is not found', async()=>{
//     await db.user.deleteMany();
//     const user = db.user.create({
//       data:{
//         name: 'Alice',
//         email: 'alice@gmail.com',
//         password:'12345678',
//         bio: 'hello',
//       }
//     })
//     const fakeId = 'abc';
//     await expect(updateUserPassword)
//   })
// })
