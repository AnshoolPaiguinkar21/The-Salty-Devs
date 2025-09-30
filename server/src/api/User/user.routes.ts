import { Router } from 'express';
import * as UserControllers from './user.controllers.ts';
import { isAuthUser } from '@middlewares/isAuthUser.middleware.ts';
import { errorHandler } from '@utils/error-handler.ts';
import {
  validateBody,
  validateParams,
} from '@middlewares/validation.middleware.ts';
import {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
  updatePasswordSchema,
  userIdSchema,
} from '../../validation/user.validation.ts';
import { isAdminAuth } from '@middlewares/isAdminAuth.middleware.ts';
import { authLimiter } from '@middlewares/rateLimit.middleware.ts';

const router = Router();

router.get('/all', isAdminAuth, UserControllers.fetchUsers);
router.delete(
  '/:id',
  [validateParams(userIdSchema), isAuthUser, isAdminAuth],
  UserControllers.deleteUser
);
router.get('/:id', validateParams(userIdSchema), UserControllers.fetchUser);
router.post(
  '/login',
  authLimiter,
  validateBody(loginUserSchema),
  UserControllers.signinUser
);
router.post('/logout', UserControllers.logoutUser);
router.post(
  '/register',
  validateBody(registerUserSchema),
  UserControllers.createUser
);
router.put(
  '/:id',
  [validateParams(userIdSchema), validateBody(updateUserSchema), isAuthUser],
  UserControllers.updateUser
);
router.put(
  '/:id/password',
  [
    validateParams(userIdSchema),
    validateBody(updatePasswordSchema),
    isAuthUser,
  ],
  UserControllers.updateUserPassword
);
router.post('/refresh', UserControllers.refreshToken);

export default router;
