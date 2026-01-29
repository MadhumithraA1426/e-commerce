import Order from "../models/Order.js";

/**
 * @desc Create new order
 * @route POST /api/orders
 * @access Private
 */
export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Get logged in user's orders
 * @route GET /api/orders/myorders
 * @access Private
 */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user }).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Get all orders (Admin)
 * @route GET /api/orders/admin
 * @access Private/Admin
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Update order status (Admin)
 * @route PUT /api/orders/:id
 * @access Private/Admin
 */
export const updateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status === "delivered") {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
