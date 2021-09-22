import connectDB from "../../../utils/connectDB";
import auth from "../../../middleware/auth";
import User from "../../../models/User";
import bcrypt from "bcrypt";

connectDB();

const handler = async (req, res) => {
  try {
    switch (req.method) {
      case "PATCH":
        await resetPassword(req, res);
        break;

      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const result = await auth(req, res);

    const { password, currentPass } = req.body;

    const isMatch = await bcrypt.compare(currentPass, result.password);

    if (!isMatch)
      return res.json({
        success: false,
        message: "Your current password is wrong!",
      });

    const passwordHash = await bcrypt.hash(password, 12);

    await User.findOneAndUpdate({ _id: result.id }, { password: passwordHash });

    res.json({ success: true, message: "Password update success!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;
