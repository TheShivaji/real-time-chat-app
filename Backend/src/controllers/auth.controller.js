import User from "../models/user.model.js"
import bcriypt from "bcryptjs"
import generateCookieAndSet from "../util/genratetoken.js"
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
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  }
  catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export const login = (req, res) => {
  res.send("login")
}
export const logout = (req, res) => {
  res.logout("logout")
}
