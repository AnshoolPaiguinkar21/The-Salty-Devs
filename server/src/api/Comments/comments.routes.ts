import { Router } from "express";
import * as CommentController from "./comments.controller.ts";

const router = Router()

router.get("/", CommentController.getComments)
router.get("/:id", CommentController.getComment)
router.post("/", CommentController.addComment)
router.put("/:id", CommentController.editComment)
router.delete("/:id", CommentController.deleteComment)

export default router;