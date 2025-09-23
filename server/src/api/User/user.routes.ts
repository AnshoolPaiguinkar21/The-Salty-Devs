import {Router} from "express"
import * as UserControllers from "./user.controllers.ts"
import {isAdmin} from "@middlewares/isAdmin.middleware.ts"
import { isAuthUser } from "@middlewares/isAuthUser.middleware.ts"
import { errorHandler } from "@utils/error-handler.ts"

const router = Router()

router.get("/all", isAdmin, UserControllers.fetchUsers)
router.delete("/:id", [isAuthUser, isAdmin], UserControllers.deleteUser)
router.get("/:id", UserControllers.fetchUser)
router.post("/login", UserControllers.signinUser)
router.post("/logout", UserControllers.logoutUser)
router.post("/register", UserControllers.createUser)
router.put("/:id", isAuthUser, UserControllers.updateUser)
router.post("/refresh", UserControllers.refreshToken);



export default router;