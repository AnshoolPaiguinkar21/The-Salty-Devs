import { Router } from "express";
import * as PostController from "./post.controller.ts";
import { isAuthUser } from "@middlewares/isAuthUser.middleware.ts";
import { isAdminAuth } from "@middlewares/isAdminAuth.middleware.ts";

const router = Router()

router.get("/", PostController.getPosts)
router.get("/:id", isAuthUser, PostController.getPost)
router.post("/", isAdminAuth, PostController.createPost)
router.put("/update/:id", isAdminAuth, PostController.updatePost)
router.delete("/:id", isAdminAuth, PostController.deletePost)

export default router;