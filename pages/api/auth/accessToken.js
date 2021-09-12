import jwt from "jsonwebtoken";
import User from "../../../models/User";
import connectDB from "../../../utils/connectDB";
import { createAccessToken } from "../../../utils/generateToken";

connectDB();

export default async function handler(req, res) {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) {
      return res.status(400).json({
        success: false,
        message: "Please login now!",
      });
    }

    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Your token is incorrect or has expired!",
      });
    }

    const user = await User.findById(result.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist!",
      });
    }

    const access_token = createAccessToken({ id: user._id });

    res.status(201).json({
      success: true,
      access_token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
