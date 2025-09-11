import {Router} from "express"
import * as UserControllers from "./user.controllers.ts"
import {isAdmin} from "@middlewares/isAdmin.middleware.ts"

const router = Router()

router.get("/all", isAdmin, UserControllers.fetchUsers)
router.delete("/:id", isAdmin, UserControllers.deleteUser)
router.get("/:id", UserControllers.fetchUser)
router.post("/login", UserControllers.signinUser)
router.post("/logout", UserControllers.logoutUser)
router.post("/register", UserControllers.createUser)
router.put("/:id", UserControllers.updateUser)


export default router;