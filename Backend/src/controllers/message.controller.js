import Message from "../models/message.model.js";
import cloudinary from "../config/cloudnairy.js";
import User from "../models/user.model.js"

export const getSildeMessager = async (req, res) => {
  try {
    const loginUserId = req.user._id
    const filterUsers = await User.find({ _id: { $ne: loginUserId } }).select("-password");

    res.status(200).json(filterUsers)
  } catch (error) {
    console.log("Error in message controller", error.message)
    res.status(500).json({
      error: "Internal server error"
    })
  }
}

export const getMessage = async (req, res) => {
  try {
    const { id: userChatId } = req.params
    const myid = req.user._id

    const message = await Message.find({
      $or: [
        { senderId: myid, receiverId: userChatId },
        { senderId: userChatId, receiverId: myid }
      ]
    })
    res.status(200).json(message)
  } catch (error) {
    console.log("Error in getMessgae controller", error.message)
    res.status(500).json({
      error: "Internal server error "
    })
  }
}

export const sendMessage = async (req, res) => {
  try {
    const { message, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadresponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadresponse.secure_url
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      image: imageUrl,
    });
    await newMessage.save();
    res.status(200).json(newMessage)
  } catch (error) {
    console.log("Error in sendMessage", error.message)
    res.status(500).json({
      error: "Internal server error"
    })
  }
}
