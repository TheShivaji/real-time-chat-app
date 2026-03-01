import express from "express"
import { getSildeMessager ,getMessage ,sendMessage } from "../controllers/message.controller.js"
import proctectRoutes from "../middleware/protectRoutes.js"

const authMessage = express.Router()

authMessage.get("/user" , proctectRoutes ,getSildeMessager)

authMessage.get("/:id" , proctectRoutes , getMessage)

authMessage.post("/send/:id" , proctectRoutes , sendMessage)

export default authMessage
