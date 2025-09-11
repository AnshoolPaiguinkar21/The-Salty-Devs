import { Router } from "express"; 
import * as UserControllers from "./user.controllers.ts"
import {isAdmin} from "@middlewares/isAdmin.middleware.ts"

const router = Router();



export default router;