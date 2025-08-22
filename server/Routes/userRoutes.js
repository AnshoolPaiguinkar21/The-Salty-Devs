import {Router} from "express"
import {createUser, updateUser, fetchUsers, fetchUser, deleteUser} from "../Controller/userController.js"

const router = Router()

router.get("/", fetchUsers)
router.get("/:id", fetchUser)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

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

export default router;