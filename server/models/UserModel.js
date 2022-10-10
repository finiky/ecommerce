const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isEmail } = require("validator");
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Minimum length should be 6 characters"],
  },
  registerDate: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("User", UserSchema);
