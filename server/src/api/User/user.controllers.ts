import type { Request, Response } from "express";
import {body, validationResult} from "express-validator"
import * as UserService from "./user.services.ts"

export const fetchUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserService.fetchUsers();
        return res.status(200).json(users);
    }  
    catch(error: any){
        return res.status(500).json(error.message);
    }
}

export const fetchUser = async (req: Request, res: Response) => {

    const id: number = parseInt(req.params.id, 10);

    try{
        const user = await UserService.fetchUser(id);
        return res.status(200).json(user);
    }
    catch(error: any) {
        return res.status(500).json(error.message)
    }
}
 
export const createUser = async (req: Request, res: Response) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newUser = await UserService.createUser(req.body);
        return res.status(201).json(newUser);
    }
    catch(error: any){
        if (error.message.includes("User already exists")){
            return res.status(409).json({status: 409, message: error.message});
        }
        return res.status(500).json(error.message)
    }
}

export const updateUser = async (req: Request, res: Response) => {

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
                }

                const id: number = parseInt(req.params.id, 10);
                try {
                    const updatedUserData = await UserService.updateUser(id, req.body);
                    return res.status(200).json(updatedUserData);

                }
                catch(error: any){
                    return res.status(500).json(error.message);
                }
            }

export const deleteUser = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        await UserService.deleteUser(id);
        return res.status(204).send("User Deleted")
    }
    catch(error: any) {
        return res.status(500).json(error.message)
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