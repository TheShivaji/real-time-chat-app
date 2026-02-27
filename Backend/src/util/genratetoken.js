import jwt from "jsonwebtoken"

const generateCookieAndSet = (userID , res) => {
  const token = jwt.sign({
    userID
  },
    process.env.JWT_SECRET
    ,
    {expiresIn: "30d"}
  )
  res.cookie("jwt", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateCookieAndSet
