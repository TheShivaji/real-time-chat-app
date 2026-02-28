import {v2 as cloudinary} from "cloudinary"
import {config} from "dotenv"

config()

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.IMAGE_API,
  api_secret:process.env.API_SECRET,
});

export default cloudinary
