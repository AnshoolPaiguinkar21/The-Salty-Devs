import { Router } from "express";
import * as CommentController from "./comments.controller.ts";
import { isAuthUser } from "@middlewares/isAuthUser.middleware.ts";
import { isCommentAuthor } from "@middlewares/isCommentAuthor.middleware.ts";
import { isAdmin } from "@middlewares/isAdmin.middleware.ts";

const router = Router()

router.get("/", CommentController.getComments)
router.get("/:id", CommentController.getComment)
router.post("/", isAuthUser, CommentController.addComment)
router.put("/:id", isCommentAuthor, CommentController.editComment)
router.delete("/:id", isCommentAuthor || isAdmin, CommentController.deleteComment)

export default router;