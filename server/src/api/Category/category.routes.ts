import { Router } from 'express';
import * as CategoryController from './category.controller.ts';
import { isAdminAuth } from '@middlewares/isAdminAuth.middleware.ts';

const router = Router();

router.get('/', CategoryController.getCategories);
router.get('/:id', CategoryController.getCategory);
router.post('/', isAdminAuth, CategoryController.addCategory);
router.put('/:id', isAdminAuth, CategoryController.editCategory);
router.delete('/:id', isAdminAuth, CategoryController.deleteCategory);

export default router;
