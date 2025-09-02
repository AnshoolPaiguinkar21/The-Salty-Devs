import type { Request, Response } from "express"
import * as PostServices from "./post.services.ts"

export const getPosts = async(req: Request, res: Response) => {
    try{
        const posts = await PostServices.getPosts();
        return res.status(200).json(posts);
    }
    catch(error: any){
        return res.status(500).json(error.message)
    }
}

export const getPost = async (req: Request, res: Response) => {

    const id: number = parseInt(req.params.id, 10);

    try{
        const uniquePost = await PostServices.getPost(id);
        return res.status(200).json(uniquePost);
    }
    catch(error: any){
        return res.status(500).json(error.message)
    }
}

export const createPost = async (req: Request, res: Response) => {
    
    try{
        const newPost = await PostServices.createPost(req.body);
        return res.status(201).json(newPost);
    }
    catch(error: any){
        return res.json(error.message)
    }
}

export const updatePost = async(req: Request, res: Response) => {
    
    const id: number = parseInt(req.params.id, 10);
    
    try{
        const updateAuthorPost = await PostServices.updatePost(id, req.body);
        return res.status(200).json(updateAuthorPost);
    }
    catch(error: any){
        return res.status(500).json(error.message)
    }
}

export const deletePost = async(req: Request, res: Response) => {
    
    const id: number = parseInt(req.params.id, 10);
    
    try{
        const delPost = await PostServices.deletePost(id);
        return res.json({data: delPost, message: "Post deleted"})
    }
    catch(error: any){
        return res.json(error.message)
    }
}