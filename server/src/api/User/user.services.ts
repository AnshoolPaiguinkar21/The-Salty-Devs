import { db } from '@utils/db.config.ts';
import { AppError } from '@utils/appError.ts';
import { HttpStatusCodes } from '@utils/httpStatusCodes.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

export type User = {
  id: string;
  name: string | null;
  email: string;
  password: string;
  bio?: string | null;
  role: Role;
};

export type UserResponse = {
  id: string;
  name: string | null;
  email: string;
  bio: string | null;
};

type JWTPayload = {
  id: string;
  email: string;
  role: Role;
};

export const fetchUsers = async (): Promise<UserResponse[]> => {
  return db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      // role: true
    },
    orderBy: {
      id: 'asc',
    },
  });
};

export const fetchUser = async (id: string): Promise<UserResponse | null> => {
  return db.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      role: true,
    },
  });
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const { name, email, password, bio } = user;
  const findUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (findUser) {
    throw new AppError('Email already exists.', HttpStatusCodes.CONFLICT);
    //throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      bio,
    },
  });
};

export const signinUser = async (
  user: User
): Promise<{ token: string; refreshToken: string; user: UserResponse }> => {
  const { email, password } = user;
  const findUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!findUser) {
    throw new AppError('User does not exist', HttpStatusCodes.NOT_FOUND);
  }

  const comparedPassword = await bcrypt.compare(password, findUser.password);

  if (!comparedPassword) {
    throw new AppError("Invalid Credentials. Please try again", HttpStatusCodes.UNAUTHORIZED);
  }

  const payload: JWTPayload= {
    id: findUser.id,
    email: findUser.email,
    role: findUser.role
  }

<<<<<<< Updated upstream
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string,{expiresIn: '1h'});

  const refreshToken = jwt.sign(payload,process.env.JWT_SECRET_KEY as string, { expiresIn: '1D'}); 

  return {
  token,refreshToken,
=======
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string,{
    expiresIn :'15m'
  })
  const refreshtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY as string,{
    expiresIn :'7d'
  })

  return {
  token,refreshtToken,
>>>>>>> Stashed changes
  user: {
    id: findUser.id,
    name: findUser.name,
    email: findUser.email,
    bio: findUser.bio
  }
} 
}

export const updateUser = async (
  id: string,
  user: Omit<User, 'id'>
): Promise<User> => {
  const { name, email, password, bio } = user;

  let hashedPassword = password;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }
  return db.user.update({
    where: {
      id: id,
    },
    data: {
      name,
      email,
      password: hashedPassword,
      bio,
    },
  });
};

export const deleteUser = async (id: string): Promise<void> => {
  await db.user.delete({
    where: { id: id },
  });
};
