import { Router } from 'express';
import * as CommentController from './comments.controller.ts';
import { isAuthUser } from '@middlewares/isAuthUser.middleware.ts';
import { isCommentAuthorOrAdmin } from '@middlewares/isCommentAuthorOrAdmin.middleware.ts';
import { commentSpamLimiter } from '@middlewares/rateLimit.middleware.ts';

const router = Router();

router.get('/:postId', CommentController.getCommentsByPost);
router.get('/:id', CommentController.getComment);
router.post('/', isAuthUser, commentSpamLimiter, CommentController.addComment);
router.put(
  '/:id',
  isAuthUser,
  isCommentAuthorOrAdmin,
  CommentController.editComment
);
router.delete(
  '/:id',
  isAuthUser,
  isCommentAuthorOrAdmin,
  CommentController.deleteComment
);

export default router;
