import { Router } from 'express';

import UserRoutes from '@api/User/user.routes.ts';
import PostRoutes from '@api/Post/post.routes.ts';
import CommentRoutes from '@api/Comments/comments.routes.ts';
import CategoryRoutes from '@api/Category/category.routes.ts';

const router = Router();

router.use('/api/user', UserRoutes);
router.use('/api/posts', PostRoutes);
router.use('/api/comments', CommentRoutes);
router.use('/api/categories', CategoryRoutes);

export default router;
