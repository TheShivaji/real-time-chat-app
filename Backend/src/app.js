import express from "express"
import authRoute from "./routes/authRoute.js"
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.js"

const app = express();

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)

app.use("/api/message" , messageRoute)

export default app
