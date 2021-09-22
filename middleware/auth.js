import jwt from "jsonwebtoken";
import User from "../models/User";

const auth = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token)
      return res
        .status(400)
        .json({ success: false, message: "Invalid authorization" });

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decode)
      return res
        .status(400)
        .json({ success: false, message: "Invalid authorization" });

    const user = await User.findOne({ _id: decode.id });

    return { id: user._id, password: user.password };
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default auth;
