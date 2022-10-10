const mongoose = require("mongoose");
const { Schema } = mongoose;
const CartSchema = new Schema({
  userId: { type: String },
  items: [
    {
      productId: { type: String },
      name: { type: String },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity cannot be less than 1"],
        default: 1,
      },
      price: { type: Number },
    },
  ],
  bill: { type: Number, required: true, deault: 0 },
});
module.exports = mongoose.model("Cart", CartSchema);
