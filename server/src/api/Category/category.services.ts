import {db} from "../../utils/db.config.ts";
import type {User} from "../User/user.services.ts"
import type {PostRead} from "../Post/post.services.ts"

export type CategoryView = {
    id : number,
    name: string,
    post : PostRead,
}

export type CategoryAdd = {
    name: string,
}

export const getComments = async (): Promise<CategoryView[]> => {

    return db.comment.findMany({
        select: {
            id: true,
            name: true,
            createdAt: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            post: {
                select: {
                    id: true,
                    title: true,
                }
            }
        },
        orderBy: { id: "asc", }
    })
}

export const getComment = async (id: number): Promise<CategoryView | null> => {
    return db.comment.findUnique({
        where: {id},
        select: {
            id: true,
            content: true,
            createdAt: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        }
    })
}

export const addComment = async (comment: CategoryAdd): Promise<CategoryView> => {
    const {postId, authorId, content, createdAt} = comment;
    const parsedDate: Date = new Date(createdAt);

    return db.comment.create({
        data: {
            postId,
            authorId,
            content,
            createdAt: parsedDate,
        },
        select: {
            id:true,
            content:true,
            createdAt:true,
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    bio: true,
                }
            }
        }
    });
}

export const editComment = async (id: number, comment: CategoryAdd): Promise<CategoryView> => {
    
    const {postId, authorId, content, createdAt} = comment;
    const parsedDate: Date = new Date(createdAt);
    
    return db.comment.update({
        where: {
            id
        },
        data: {
            postId,
            authorId,
            content,
            createdAt,
        },
        select: {
            id:true,
            content:true,
            createdAt:true,
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    bio: true,
                }
            }
        }
    })
}

export const deleteComment = async (id: number): Promise<void> => {
    return db.post.delete({
        where: {id}
    })
}