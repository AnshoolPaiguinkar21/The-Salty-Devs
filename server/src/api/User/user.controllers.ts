import type { NextFunction, Request, Response } from "express";
import {body, validationResult} from "express-validator"
import * as UserService from "./user.services.ts"
import { HttpStatusCodes } from "@utils/httpStatusCodes.ts"
import jwt from "jsonwebtoken"
import { registerUserSchema } from "validation/user.validation.ts";
import { fromZodError } from "zod-validation-error";
import {z} from 'zod'

// Login 
export const signinUser = async (req: Request, res: Response) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    try {
        const existingUser = await UserService.signinUser(req.body);
        const token = existingUser.token;
        const refreshToken = existingUser.refreshToken;
        res.cookie('jwt', token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: false,
            sameSite: 'strict', // Protects against CSRF attacks
            maxAge:  60 * 60 * 1000, // Cookie expires in 1 hr
        });
         res.cookie("refreshJwt", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        return res.status(HttpStatusCodes.OK).json(existingUser);
    }
    catch(error: any){
        if (error.message.includes("Invalid Credentials. Please try again") || 
            error.message.includes("User does not exist") || 
            error.message.includes("Unauthorized: No token provided."))
        {
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({message: error.message});
        }
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}

// Logout
export const logoutUser = async (req: Request, res: Response) => {
    try {
        res.clearCookie('jwt');
        res.clearCookie('refreshJwt');
        res.status(HttpStatusCodes.OK).json({success: true, message:"User has been logged out successfully"})
    }
    catch (error: any){
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}

// Get existing users
export const fetchUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserService.fetchUsers();
        return res.status(HttpStatusCodes.OK).json(users);
    }  
    catch(error: any){
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
}

// Get a single user by unique ID
export const fetchUser = async (req: Request, res: Response) => {

    const id: string = req.params.id;

    try{
        const user = await UserService.fetchUser(id);
        return res.status(HttpStatusCodes.OK).json(user);
    }
    catch(error: any) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}

// Register a new user
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const result = registerUserSchema.safeParse(req.body)
    if(!result.success){
        const valError = z.treeifyError(result.error)
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            status: "error",
            message: "Validation failed",
            errors: valError, // Zod's error format
        });
    }
    const newUser = await UserService.createUser(req.body);
    return res.status(HttpStatusCodes.CREATED).json(newUser);
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    // }

    // try {
    //     registerUserSchema.parse(req.body)
    //     const newUser = await UserService.createUser(req.body);
    //     return res.status(HttpStatusCodes.CREATED).json(newUser);
    // }
    // catch(error: any){
    //     if (error.message.includes("User already exists")){
    //         return res.status(HttpStatusCodes.CONFLICT).json({status: 409, message: error.message});
    //     }
    //     else if (error.message.includes("Name must atleast 2 characters long")){
    //         return res.status(HttpStatusCodes.CONFLICT).json({status: 409, message: error.message});
    //     }
    //     else if (error.message.includes("Password must be atleast 8 characters long")){
    //         return res.status(HttpStatusCodes.CONFLICT).json({status: 409, message: error.message});
    //     }
    //     return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    // }
}

// Update existing user data
export const updateUser = async (req: Request, res: Response) => {

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
                }

                const id: string = req.params.id;
                try {
                    const updatedUserData = await UserService.updateUser(id, req.body);
                    return res.status(HttpStatusCodes.OK).json(updatedUserData);

                }
                catch(error: any){
                    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
                }
            }

// Delete an existing user
export const deleteUser = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        await UserService.deleteUser(id);
        return res.status(HttpStatusCodes.OK).send("User Deleted")
    }
    catch(error: any) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}

export const refreshToken = async (req: Request, res: Response) => {
    try{
        const refreshToken = req.cookies.refreshJwt;
        if (!refreshToken) {
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: "No token provided." });
        } 
         // Verify refresh token
        jwt.verify(
        refreshToken,
        process.env.JWT_SECRET_KEY as string,
        (err: any, decoded: any) => {
            if (err) {
            return res
                .status(HttpStatusCodes.FORBIDDEN)
                .json({ message: "Invalid or expired refresh token" });
            }

            const payload = {
            id: (decoded as any).id,
            email: (decoded as any).email,
            role: (decoded as any).role,
            };

            // Generate new access token
            const newAccessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "1h" }
            );

            // (Optional) Generate a new refresh token too
            const newRefreshToken = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "1d" }
            );

            // Reset cookies
            res.cookie("jwt", newAccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000, // 1h
            });

            res.cookie("refreshJwt", newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge:  24 * 60 * 60 * 1000, // 1 day
            });

            return res.status(HttpStatusCodes.OK).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            });
        }
        );
    }
    catch(error: any){
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}

/*
import {createUser, updateUser, fetchUsers, fetchUser, deleteUser} from "./userController"

router.get("/", fetchUsers)
router.get("/:id", fetchUser)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)*/

// router.get("/", async (req, res) => {
//     try{
//         const posts = await prisma.post.findMany({
//         include: {
//             author: true,
//             category: true,
//             comments: true,
//         },
//     });
//         res.json(posts);
//     }
//     catch(error) {
//         res.status(404).json({ error : "Failed to fetch posts"});
//     }
// });

//export default router;