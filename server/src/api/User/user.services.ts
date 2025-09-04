import { db } from '@utils/db.config.ts';
import { AppError } from '@utils/appError.ts';
import { HttpStatusCodes } from '@utils/httpStatusCodes.ts';

export type User = {
  id: string;
  name: string | null;
  email: string;
  password: string;
  bio?: string | null;
};

export type UserResponse = {
  id: string;
  name: string | null;
  email: string;
  bio: string | null;
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

  return db.user.create({
    data: {
      name,
      email,
      password,
      bio
    },
  });
};

export const updateUser = async (
  id: string,
  user: Omit<User, 'id'>
): Promise<User> => {
  const { name, email, password, bio } = user;
  return db.user.update({
    where: {
      id: id,
    },
    data: {
      name,
      email,
      password,
      bio
    },
  });
};

export const deleteUser = async (id: string): Promise<void> => {
  await db.user.delete({
    where: { id: id },
  });
};

/*export const fetchUsers = async (req: Request, res: Response) => {

    const {name, email} = req.body;

    const allUsers= await db.user.findMany({
        select: {
            name: true, 
            email:true
        },
        orderBy : {
            id: 'asc',
        }
    })

    return res.json({status:200, data:allUsers, message: "Fetched all the users"})
}

export const fetchUser = async (req: Request, res: Response) => {
    const userID = req.params.id;
    const {name, email, password} = req.body;

    const fetchUser = await db.user.findUnique({
        where : { id: Number(userID) },
    })

    if(!fetchUser){
        //return res.status(404).json({message: "User doesn't exist"})
    }

    return res.json({status:200, data:fetchUser, message: "User data fetched"})
}

export const createUser = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    const findUser = await db.user.findUnique({
        where: {
            email:email
        }
    });

    if(findUser){
        return res.status(404).json({status: 404, message: "Email already exists. Please use a different ID"})
    }

    const newUser = await db.user.create({
        data : {
            name:name,
            email:email,
            password:password
        }
    });

    return res.json({status:200, data: newUser, message: "User created"})
}

export const updateUser = async (req: Request, res: Response) => {

    const userID = req.params.id;
    const {name, email, password} = req.body;

    await db.user.update({
        where : {
            id: Number(userID)
        },
        data : {
            name,
            email,
            password,
        }
    });

    return res.status(200).json({status:200, message: "User details updated"})
}

export const deleteUser = async (req: Request, res: Response) => {
    const userID = req.params.id;

    const delUser = await db.user.delete({
        where: { id: Number(userID) }
    });

    return res.json({status: 200, message: "User deleted successfully"})
}

// object:{
//     200: "OK",
//     404:  //catch at top level and return appropriate status code, create enums for every status code, when throwing error require
//  1. enum type 2. message 
// Create enums for every status code: Catch errors at top-level 
// and require- 1. enum type, and 2. message, when throwing an error for returning appropriate status code
// }*/
