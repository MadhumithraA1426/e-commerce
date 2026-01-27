import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    orderItems: [
      {
        name: String,
        qty: Number,
        price: Number,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        }
      }
    ],
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String
    },
    paymentMethod: {
      type: String,
      default: "Cash on Delivery"
    },
    paymentStatus: {
      type: String,
      default: "Pending"
    },
    totalPrice: {
      type: Number,
      required: true
    },
    isDelivered: {
      type: Boolean,
      default: false
    },
    deliveredAt: Date
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
