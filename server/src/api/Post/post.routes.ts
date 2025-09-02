import { Router } from "express";
import * as PostController from "./post.controller.ts";

const router = Router()

router.get("/", PostController.getPosts)
router.get("/:id", PostController.getPost)
router.post("/", PostController.createPost)
router.put("/:id", PostController.updatePost)
router.delete("/:id", PostController.deletePost)

export default router;