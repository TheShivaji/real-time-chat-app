import mongoose from "mongoose"

function  connectDatabase() {
  mongoose.connect(process.env.MOGODB_URL)
  .then(() => {
    console.log ("Database is connected")
  })
  .catch((error) => {
    console.log("Database is not connected" , error)
  })

}

export default connectDatabase
