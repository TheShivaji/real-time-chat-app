import express from "express"
import { login, logout, signup , updateProfile , Checkauth} from "../controllers/auth.controller.js"
import proctectRoutes from "../middleware/protectRoutes.js"

const authRouter = express.Router()

authRouter.post("/signup" , signup)
authRouter.post("/login" , login)
authRouter.post("/logout" , logout)

authRouter.put("/update-profile" , proctectRoutes , updateProfile)

authRouter.get("/Check" , proctectRoutes , Checkauth)

export default authRouter
