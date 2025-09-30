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
