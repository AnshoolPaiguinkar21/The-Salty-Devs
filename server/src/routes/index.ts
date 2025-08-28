import {Router} from "express"

import UserRoutes from "../api/User/user.routes.ts"

const router = Router()

router.use("/api/user", UserRoutes)

export default router