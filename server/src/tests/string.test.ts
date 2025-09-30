type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  role: string;
};

// Simple in-memory createUser function
async function createUser(user: Omit<User, "id">): Promise<User> {
  // Just add an id and return the user
  return {
    id: "1",
    ...user,
  };
}

describe("createUser - basic string tests", () => {
  let userData: Omit<User, "id">;

  beforeEach(() => {
    userData = {
      name: "Alice",
      email: "alice@test.com",
      password: "123456",
      bio: "Hello World",
      role: "user",
    };
  });

  it("Check email equality", async () => {
    const result = await createUser(userData);
    expect(result.email).toBe("alice@test.com");
  });

  it("Check name inequality", async () => {
    const result = await createUser(userData);
    expect(result.name).not.toBe("Bob");
  });

  it("Check substring in bio", async () => {
    const result = await createUser(userData);
    expect(result.bio).toContain("Hello");
  });

  it("Check role equality", async () => {
    const result = await createUser(userData);
    expect(result.role).toBe("user");
  });

  it("Check that password is not the same as some other string", async () => {
    const result = await createUser(userData);
    expect(result.password).not.toBe("abcdef");
  });

  it("Check name length", async () => {
    const result = await createUser(userData);
    expect(result.name.length).toBe(5);
  });
});
