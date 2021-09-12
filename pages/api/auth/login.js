import bcrypt from "bcrypt";
import User from "../../../models/User";
import connectDB from "../../../utils/connectDB";
import { validateEmail } from "../../../utils/validForm";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../utils/generateToken";

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const { usernameOrEmail, password } = req.body;

        const isEmail = validateEmail(usernameOrEmail); // check usernameOrEmail is email or username

        if (isEmail) {
          var user = await User.findOne({ email: usernameOrEmail });
        } else {
          var user = await User.findOne({ username: usernameOrEmail });
        }

        if (!user) {
          return res.status(400).json({
            success: false,
            message: "This user does not exist.",
          });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({
            success: false,
            message: "Incorrect password",
          });
        }

        const access_token = createAccessToken({ id: user._id });
        const refresh_token = createRefreshToken({ id: user._id });

        res.status(200).json({
          success: true,
          message: "Login success!",
          access_token,
          refresh_token,
          user: {
            username: user.username,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            root: user.root,
          },
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "An error occurred while logging in!",
        });
      }
      break;
    default:
      res.status(400).json({
        success: false,
        message: "An error occurred. Try again!",
      });
      break;
  }
}
