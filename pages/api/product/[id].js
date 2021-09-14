import connectDB from "../../../utils/connectDB";
import Product from "../../../models/Product";

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;

    default:
      break;
  }
}

const getProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "This product does not exist" });
    }

    res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
