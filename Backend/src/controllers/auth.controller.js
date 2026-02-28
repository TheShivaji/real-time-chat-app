import User from "../models/user.model.js"
import bcriypt from "bcryptjs"
import generateCookieAndSet from "../util/genratetoken.js"
import cloudinary from "../config/cloudnairy.js"

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Required to fill detail"
      })
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "The password length is must be greater than 6"
      })
    }
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        message: "User are already exist"
      })
    }
    const salt = await bcriypt.genSalt(10)
    const hashPassword = await bcriypt.hash(password, salt)
    const newUser = new User({
      fullName,
      password: hashPassword,
      email
    })
    if (newUser) {
      generateCookieAndSet(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  }
  catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(409).json({
        message: "Email is not exist"
      })
    }

    const isPassword = await bcriypt.compare(password, user.password)
    if (!isPassword) {
      return res.status(400).json({
        message: "Password is not match"
      })
    }
    generateCookieAndSet(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: email,
      profilePic: user.profilePic,
    })

  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({
      message: "Internal server error"
    })
  }
}
export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      message: "Successfully logout"
    })
  } catch (error) {
    console.log("Error in logout Controller", error.message);
    res.status(500).json({
      message: "Internal srever error"
    })
  }
}
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body
    const userId = req.user._id

    if (!profilePic) {
      return res.status(400).json({
        message: "Profile pic is required"
      })
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updateUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })

    res.status(200).json(updateUser)
  } catch (error){
    console.log("error in update profile", error.message)
    res.status(500).json({
      message: "Internal server error"
    })
  }

}

export const Checkauth = async (req , res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log("Error in checkauth controller" ,error.message)
    res.status(500).json({
      message : "Internal server error"
    })
  }
}
