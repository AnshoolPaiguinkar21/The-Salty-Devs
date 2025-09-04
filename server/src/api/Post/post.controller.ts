import type { Request, Response } from "express"
import * as PostServices from "./post.services.ts"
import { HttpStatusCodes } from "@utils/httpStatusCodes.ts";

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

    try{
        const uniquePost = await PostServices.getPost(id);
        return res.status(HttpStatusCodes.OK).json(uniquePost);
    }
    catch(error: any){
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}

export const createPost = async (req: Request, res: Response) => {
    
    try{
        const newPost = await PostServices.createPost(req.body);
        return res.status(HttpStatusCodes.CREATED).json(newPost);
    }
    catch(error: any){
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}

export const updatePost = async(req: Request, res: Response) => {
    
    const id: string = req.params.id;
    
    try{
        const updateAuthorPost = await PostServices.updatePost(id, req.body);
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