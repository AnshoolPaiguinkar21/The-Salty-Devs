import type { Request, Response } from "express"
import * as CommentServices from "./comments.services.ts"
import { HttpStatusCodes } from "@utils/httpStatusCodes.ts";

export const getComments = async(req: Request, res: Response) => {
    try{
        const posts = await CommentServices.getComments();
        return res.status(HttpStatusCodes.OK).json(posts);
    }
    catch(error: any){
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}

export const getComment = async (req: Request, res: Response) => {

    const id: string = req.params.id;

    try{
        const uniquePost = await CommentServices.getComment(id);
        return res.status(HttpStatusCodes.OK).json(uniquePost);
    }
    catch(error: any){
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}

export const addComment = async (req: Request, res: Response) => {
    
    try{
        const newPost = await CommentServices.addComment(req.body);
        return res.status(HttpStatusCodes.CREATED).json(newPost);
    }
    catch(error: any){
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}

export const editComment = async(req: Request, res: Response) => {
    
    const id: string = req.params.id;
    
    try{
        const updateAuthorPost = await CommentServices.editComment(id, req.body);
        return res.status(HttpStatusCodes.OK).json(updateAuthorPost);
    }
    catch(error: any){
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}

export const deleteComment = async(req: Request, res: Response) => {
    
    const id: string = req.params.id;
    
    try{
        const delPost = await CommentServices.deleteComment(id);
        return res.json({data: delPost, message: "Post deleted"})
    }
    catch(error: any){
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}