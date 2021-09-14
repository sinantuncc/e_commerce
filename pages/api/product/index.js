import connectDB from "../../../utils/connectDB";
import Product from "../../../models/Product";

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;

    default:
      break;
  }
}

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({ success: true, total: products.length, products });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
