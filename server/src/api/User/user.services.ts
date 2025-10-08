import { db } from '@utils/db.config.ts';
import { AppError } from '@utils/appError.ts';
import { HttpStatusCodes } from '@utils/httpStatusCodes.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Role} from '@prisma/client';
import {
  LoginUserInput,
  RegisterUserInput,
  UpdateUserInput,
} from '@validation/user.validation.ts';
import config from 'constants/config.ts';
import { sendOtpEmail, sendWelcomeEmail } from 'mail/mail.services.ts';

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
  bio?: string | null;
  role: Role;
};

type JWTPayload = {
  id: string;
  role: Role;
};

type OtpVerificationData = {
    email: string;
    otp: string;
    expiresAt: Date;
    data: string; // JSON string of the user details (name, password, bio, role)
};

// --- UTILITY FUNCTION ---
const generateOtp = (): string => {
    // Generate a 6-digit number string
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const fetchUsers = async (): Promise<UserResponse[]> => {
  return db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      role:true,
    },
    orderBy: {
      createdAt: 'asc',
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

/*
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
*/

export const createUser = async (user: Omit<User, 'id'>): Promise<{ message: string, email: string }> => {
    const { name, email, password, bio, role } = user;
    
    // 1. Check if user already exists in the permanent table
    const findUser = await db.user.findUnique({ where: { email } });
    if (findUser) {
        throw new AppError('This email is already registered.', HttpStatusCodes.CONFLICT);
    }

    // 2. Clear any old pending OTPs for this email (cleanup)
    await db.otpVerification.deleteMany({ where: { email } });

    // 3. Prepare data for temporary storage
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const expiryTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    const tempUserData = {
        name,
        password: hashedPassword,
        bio,
        role,
    };

    // 4. Save to temporary table
    await db.otpVerification.create({
        data: {
            email,
            otp,
            expiresAt: expiryTime,
            data: JSON.stringify(tempUserData), // Store sensitive data securely as JSON string
        },
    });

    // 5. Send OTP Email
    await sendOtpEmail(email, otp);

    return { 
        message: `OTP sent successfully to ${email}. Please verify your account.`,
        email: email
    };
};

// Verifies OTP and activates account
export const verifyOtp = async (email: string, otp: string): Promise<{ token: string, user: UserResponse }> => {
    // 1. Find the pending verification record
    const pendingVerification = await db.otpVerification.findFirst({
        where: { email },
        orderBy: { expiresAt: 'desc' },
    });

    if (!pendingVerification) {
        throw new AppError('Registration not found. Please try registering again.', HttpStatusCodes.NOT_FOUND);
    }
    
    // 2. Check OTP and Expiry
    if (pendingVerification.otp !== otp || pendingVerification.expiresAt < new Date()) {
        // Delete the entry to prevent brute-forcing
        await db.otpVerification.delete({ where: { id: pendingVerification.id } });
        throw new AppError('Invalid or expired OTP.', HttpStatusCodes.BAD_REQUEST);
    }

    // 3. OTP is valid, parse the temporary user data
    const tempUserData = JSON.parse(pendingVerification.data);
    
    // 4. Create the permanent user account
    const newUser = await db.user.create({
        data: {
            email: pendingVerification.email,
            name: tempUserData.name,
            password: tempUserData.password,
            bio: tempUserData.bio,
            role: tempUserData.role,
        },
    });

    // 5. Cleanup: Delete the temporary verification record
    await db.otpVerification.delete({ where: { id: pendingVerification.id } });
    
    // 6. Send welcome email (non-blocking)
    sendWelcomeEmail(newUser.email, newUser.name).catch(console.error);

    // 7. Generate JWT and return
    const payload: JWTPayload = { id: newUser.id, role: newUser.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, { expiresIn: '1d' });
    
    return {
        token,
        user: { id: newUser.id, name: newUser.name, email: newUser.email, bio: newUser.bio},
    };
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
    role: findUser.role,
  };

  const token = jwt.sign(payload, config.JWT_SECRET_KEY as string, {
    expiresIn: config.ACCESS_TOKEN_EXPIRES_IN,
  });
  const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET_KEY  as string, {
    expiresIn: config.REFRESH_TOKEN_EXPIRES_IN,
  });

  return {
    token,
    refreshToken,
    user: {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email, 
      bio: findUser.bio,
      role:findUser.role,
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
