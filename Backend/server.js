import app from "./src/app.js"
import connectDatabase from "./src/config/database.js"
import dotenv from "dotenv"
dotenv.config()

connectDatabase()
const PORT = process.env.PORT
app.listen(PORT , () => {
  console.log (`Server is running on ${PORT}`)
})
