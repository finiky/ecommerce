const CartModel = require("../models/CartModel");
module.exports = {
  addToCart: async (request, response, next) => {
    try {
      const userId = request.params.id;
      const item = request.body;
      const cart = await CartModel.findOne({ userId });
      if (!cart) {
        if (
          item.quantity <= 0 ||
          item.quantity === null ||
          item.quantity === undefined
        ) {
          item.quantity = 1;
        }
        const createCart = {
          userId: userId,
          items: [
            {
              productId: item._id,
              name: item.title,
              quantity: item.quantity,
              price: item.price,
            },
          ],
          bill: item.quantity * item.price,
        };
        const newCart = new CartModel(createCart);
        await newCart.save();
        const updatedCart = await CartModel.findOne({ userId });
        return response.status(200).json(updatedCart);
      }
      cart.items.push({
        productId: item._id,
        name: item.title,
        quantity: item.quantity,
        price: item.price,
      });
      cart.bill =
        cart.bill +
        cart.items[cart.items.length - 1].price *
          cart.items[cart.items.length - 1].quantity;
      await CartModel.findOneAndUpdate({ userId }, cart);
      const updatedItem = await CartModel.findById(cart._id);
      return response.status(200).json(updatedItem);
    } catch (error) {
      next(error);
    }
  },
  getCartItems: async (request, response, next) => {
    try {
      const userId = request.params.id;
      const cart = await CartModel.findOne({ userId });
      if (!cart) {
        return response.status(200).json({ message: "Cart empty" });
      }
      return response.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  },
  deleteItem: async (request, response, next) => {
    try {
      const { userId, itemId } = request.params;
      const cart = await CartModel.findOne({ userId });
      if (!cart || cart.items.length === 0) {
        return response.status(200).json({ message: "Cart empty" });
      }
      removeItem = cart.items.filter((item) => itemId === item._id.valueOf());
      cart.items = cart.items.filter((item) => itemId !== item._id.valueOf());
      cart.bill =
        cart.bill -
        removeItem[0].quantity.valueOf() * removeItem[0].price.valueOf();
      await CartModel.findOneAndUpdate({ userId }, cart);
      const getCart = await CartModel.findOne({ userId });
      return response.status(200).json(getCart);
    } catch (error) {
      next(error);
    }
  },
};
