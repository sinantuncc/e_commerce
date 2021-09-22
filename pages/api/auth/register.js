import bcrypt from "bcrypt";
import User from "../../../models/User";
import connectDB from "../../../utils/connectDB";

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const { username, email, password } = req.body;

        const isSameUsername = await User.findOne({ username });

        if (isSameUsername) {
          return res.status(400).json({
            success: false,
            message: "This username already exists. Try another username.",
          });
        }

        const isSameEmail = await User.findOne({ email });

        if (isSameEmail) {
          return res.status(400).json({
            success: false,
            message: "This email already exists. Try another email.",
          });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = {
          username,
          email,
          password: passwordHash,
        };

        await User.create(newUser);

        res.status(201).json({
          success: true,
          message: "Register successfully!",
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "An error occurred while registering.",
        });
      }
      break;
    default:
      res.status(400).json({
        success: false,
        message: "An error occurred.",
      });
      break;
  }
}
