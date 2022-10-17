const OrderModel = require("../models/OrderModel");
const CartModel = require("../models/CartModel");
const UserModel = require("../models/UserModel");
const config = require("../../config");
const stripe = require("stripe")(config.StripeAPIKey);
module.exports = {
  checkout: async (request, response, next) => {
    try {
      const userId = request.params.id;
      const { source } = request.body;
      const cart = await CartModel.findOne({ userId });
      const user = await UserModel.findOne({ _id: userId });
      const email = user.email;
      if (!cart) {
        return response.status(200).json({ message: "Cart is empty" });
      }
      const charge = await stripe.charges.create({
        amount: cart.bill,
        currency: "NZD",
        source: source,
        receipt_email: email,
      });
      if(!charge) {
        throw Error('Payment failed');
      }
      const createOrder = new OrderModel({
        userId: cart.userId,
        items: cart.items,
        bill: cart.bill,
      });
      const order = await createOrder.save();
      await CartModel.findOneAndDelete({userId});
      return response.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },
  getOrders: async (request, response, next) => {
    const { id } = request.params;
    const orders = await OrderModel.find({});
    if (!orders) {
      return response.status(200).json({ message: "You have no orders" });
    }
    return response.status(200).json(orders);
  },
};
