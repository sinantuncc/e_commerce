import { models, model, Schema, Types } from "mongoose";

const OrderSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    fullName: String,
    address: String,
    mobile: String,
    cart: Array,
    total: Number,
    delivered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Order || model("Order", OrderSchema);
