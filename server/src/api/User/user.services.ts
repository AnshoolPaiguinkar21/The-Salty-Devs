import { db } from '@utils/db.config.ts';
import { AppError } from '@utils/appError.ts';
import { HttpStatusCodes } from '@utils/httpStatusCodes.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import {
  LoginUserInput,
  RegisterUserInput,
  UpdateUserInput,
} from '@validation/user.validation.ts';
import config from 'constants/config.ts';

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

export const createUser = async (user: RegisterUserInput): Promise<User> => {
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
  user: LoginUserInput
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
    throw new AppError(
      'Invalid Credentials. Please try again',
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const payload: JWTPayload = {
    id: findUser.id,
    email: findUser.email,
    role: findUser.role,
  };

  const token = jwt.sign(payload, config.JWT_SECRET_KEY as string, {
    expiresIn: config.ACCESS_TOKEN_EXPIRES_IN,
  });
  const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET_KEY  as string, {
    expiresIn: config.REFRESH_TOKEN_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(payload,process.env.JWT_REFRESH_SECRET_KEY as string, { expiresIn: '1D'}); 

  return {
    token,
    refreshToken,
    user: {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email, 
      bio: findUser.bio,
    },
  };
};

export const updateUser = async (
  id: string,
  user: UpdateUserInput
): Promise<User> => {
  const { name, email, bio } = user;

  return db.user.update({
    where: {
      id: id,
    },
    data: {
      name,
      email,
      bio,
    },
  });
};

export const updateUserPassword = async (
  id: string,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  const user = await db.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new AppError('User not found', HttpStatusCodes.NOT_FOUND);
  }

  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password
  );
  if (!isCurrentPasswordValid) {
    throw new AppError(
      'Current password is incorrect',
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await db.user.update({
    where: { id },
    data: { password: hashedNewPassword },
  });
};

export const deleteUser = async (id: string): Promise<void> => {
  await db.user.delete({
    where: { id: id },
  });
};
