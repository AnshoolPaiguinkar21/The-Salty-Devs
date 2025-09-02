import type { Request, Response } from "express"
import * as CommentServices from "./comments.services.ts"

export const getComments = async(req: Request, res: Response) => {
    try{
        const posts = await CommentServices.getComments();
        return res.status(200).json(posts);
    }
    catch(error: any){
        return res.status(500).json(error.message)
    }
}

export const getComment = async (req: Request, res: Response) => {

    const id: number = parseInt(req.params.id, 10);

    try{
        const uniquePost = await CommentServices.getComment(id);
        return res.status(200).json(uniquePost);
    }
    catch(error: any){
        return res.status(500).json(error.message)
    }
}

export const addComment = async (req: Request, res: Response) => {
    
    try{
        const newPost = await CommentServices.addComment(req.body);
        return res.status(201).json(newPost);
    }
    catch(error: any){
        return res.json(error.message)
    }
}

export const editComment = async(req: Request, res: Response) => {
    
    const id: number = parseInt(req.params.id, 10);
    
    try{
        const updateAuthorPost = await CommentServices.editComment(id, req.body);
        return res.status(200).json(updateAuthorPost);
    }
    catch(error: any){
        return res.status(500).json(error.message)
    }
}

export const deleteComment = async(req: Request, res: Response) => {
    
    const id: number = parseInt(req.params.id, 10);
    
    try{
        const delPost = await CommentServices.deleteComment(id);
        return res.json({data: delPost, message: "Post deleted"})
    }
    catch(error: any){
        return res.json(error.message)
    }
}