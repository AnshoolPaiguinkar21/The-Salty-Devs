import { Router } from 'express';
import * as UserController from './user.controllers.ts';
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

router.get('/all', isAdminAuth, UserController.fetchUsers);
router.delete(
  '/:id',
  [validateParams(userIdSchema), isAuthUser, isAdminAuth],
  UserController.deleteUser
);
router.get('/:id', validateParams(userIdSchema), UserController.fetchUser);
router.post(
  '/login',
  authLimiter,
  validateBody(loginUserSchema),
  UserController.signinUser
);
router.post('/logout', UserController.logoutUser);
/*router.post(
  '/register',
  validateBody(registerUserSchema),
  UserController.createUser
);*/


router.post("/register", validateBody(registerUserSchema), UserController.registerUser);

router.post("/verify-otp", UserController.verifyRegistrationOtp);

router.put(
  '/:id',
  [validateParams(userIdSchema), validateBody(updateUserSchema), isAuthUser],
  UserController.updateUser
);
router.put(
  '/:id/password',
  [
    validateParams(userIdSchema),
    validateBody(updatePasswordSchema),
    isAuthUser,
  ],
  UserController.updateUserPassword
);
router.post('/refresh', UserController.refreshToken);

export default router;
