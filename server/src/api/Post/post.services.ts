import {db} from "../../utils/db.config.ts";
import type {User} from "../User/user.services.ts"

export type PostRead = {
    id: number,
    title: string,
    content: string,
    publishedAt: Date,
    author: User
}

export type PostUpload = {
    title: string,
    content: string,
    published: boolean,
    authorId: number, //String
    publishedAt: Date,
    updatedAt: Date,
    //imageURL: string,
    //category    Category[]
}

export const getPosts = async (): Promise<PostRead[]> => {

    return db.post.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            publishedAt: true,
            updatedAt: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        },
        orderBy: { id: "asc", }
    })
}

export const getPost = async (id: number): Promise<PostRead | null> => {
    return db.post.findUnique({
        where: {id},
        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            updatedAt: true,
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

export const createPost = async (post: PostUpload): Promise<PostRead> => {
    const {title, authorId, content, published, publishedAt} = post;
    const parsedDate: Date = new Date(publishedAt);

    return db.post.create({
        data: {
            title,
            authorId,
            content,
            published,
            publishedAt: parsedDate,
        },
        select: {
            id:true,
            title:true,
            content:true,
            published:true,
            publishedAt:true,
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

export const updatePost = async (id: number, post: PostUpload): Promise<PostRead> => {
    
    const {title, authorId, content, published, publishedAt, updatedAt} = post;
    const parsedDate: Date = new Date(publishedAt);
    
    return db.post.update({
        where: {
            id
        },
        data: {
            title,
            authorId,
            content,
            published,
            publishedAt,
            updatedAt,
        },
        select: {
            id:true,
            title:true,
            content:true,
            published:true,
            publishedAt:true,
            updatedAt:true,
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

export const deletePost = async (id: number): Promise<void> => {
    return db.post.delete({
        where: {id}
    })
}