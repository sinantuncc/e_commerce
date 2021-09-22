import connectDB from "../../../utils/connectDB";
import auth from "../../../middleware/auth";
import Order from "../../../models/Order";
import Product from "../../../models/Product";

connectDB();

const handler = async (req, res) => {
  try {
    switch (req.method) {
      case "POST":
        await createOrder(req, res);
        break;
      case "GET":
        await getOrders(req, res);
        break;
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { fullName, address, mobile, cart, total } = req.body;

    const newOrder = {
      user: result.id,
      fullName,
      address,
      mobile,
      cart,
      total,
    };

    cart.filter((item) => {
      return sold(item._id, item.quantity, item.inStock, item.sold);
    });

    await Order.create(newOrder);

    res
      .status(201)
      .json({ success: true, message: "Your order successfully created." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const sold = async (id, quantity, oldInStock, oldSold) => {
  await Product.findOneAndUpdate(
    { _id: id },
    {
      inStock: oldInStock - quantity,
      sold: quantity + oldSold,
    }
  );
};

const getOrders = async (req, res) => {
  try {
    const result = await auth(req, res);

    const orders = await Order.find({ user: result.id });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export default handler;
