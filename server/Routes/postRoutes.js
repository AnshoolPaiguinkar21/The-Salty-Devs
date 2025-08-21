import express from "express"
import prisma from "../DB/db.config.js"

const router = express.Router()

router.get("/", async (req, res) => {
    try{
        const posts = await prisma.post.findMany({
        include: {
            author: true,
            category: true,
            comments: true,
        },
    });
        res.json(posts);
    }
    catch(error) {
        res.status(404).json({ error : "Failed to fetch posts"});
    }
});

export default router;