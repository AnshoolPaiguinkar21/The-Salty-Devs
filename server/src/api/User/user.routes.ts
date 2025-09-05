import {Router} from "express"
import * as UserControllers from "./user.controllers.ts"

const router = Router()

router.get("/", UserControllers.fetchUsers)
router.get("/:id", UserControllers.fetchUser)
router.post("/login", UserControllers.signinUser)
router.post("/register", UserControllers.createUser)
router.put("/:id", UserControllers.updateUser)
router.delete("/:id", UserControllers.deleteUser)

export default router;