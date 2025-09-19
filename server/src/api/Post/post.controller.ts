import type { Request, Response } from "express"
import * as PostServices from "./post.services.ts"
import { HttpStatusCodes } from "@utils/httpStatusCodes.ts";
import jwt from 'jsonwebtoken';
import { Role } from "@prisma/client";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      role: Role;
    };
  }
}

export const getPosts = async(req: Request, res: Response) => {
    try{
        const posts = await PostServices.getPosts();
        return res.status(HttpStatusCodes.OK).json(posts);
    }
    catch(error: any){
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}

export const getPost = async (req: Request, res: Response) => {

    const id: string = req.params.id;
    const userId = req.user?.id || 'guest';

    try{
        const uniquePost = await PostServices.getPost(userId, id);
        return res.status(HttpStatusCodes.OK).json(uniquePost);
    }
    catch(error: any){
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}

export const createPost = async (req: Request, res: Response) => {
    
    if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(HttpStatusCodes.FORBIDDEN).json({ message: "Forbidden: You are not authorized to create posts." });
    }

    const newPostData = {
        ...req.body,
        authorId: req.user.id, // Securely get the user ID from the JWT
        publishedAt: new Date(), // Always set the date on the server
        updatedAt: new Date()
    };
    try{
        const newPost = await PostServices.createPost(newPostData);
        return res.status(HttpStatusCodes.CREATED).json(newPost);
    }
    catch(error: any){
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}

export const updatePost = async(req: Request, res: Response) => {
    
    const id: string = req.params.id;

    if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(HttpStatusCodes.FORBIDDEN).json({ message: "Forbidden: You are not authorized to create posts." });
    }

    const userId = req.user.id;
    
    try{
        const updateAuthorPost = await PostServices.updatePost(id, userId, req.body);
        return res.status(HttpStatusCodes.OK).json(updateAuthorPost);
    }
    catch(error: any){
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}

export const deletePost = async(req: Request, res: Response) => {
    
    const id: string = req.params.id;
    
    try{
        const delPost = await PostServices.deletePost(id);
        return res.json({data: delPost, message: "Post deleted"})
    }
    catch(error: any){
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}