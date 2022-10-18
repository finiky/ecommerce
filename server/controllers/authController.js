const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");

module.exports = {
  signUp: async (request, response, next) => {
    try {
      const { name, email, password, registerDate } = request.body;
      if (!name || !email || !password) {
        return response
          .status(400)
          .json({ message: "Please enter all fields" });
      }
      if (await UserModel.findOne({ email })) {
        return response
          .status(400)
          .json({ message: "User with the email Id already exists" });
      }
      const newUser = new UserModel({ name, email, password, registerDate });
      //create salt and hash to encrypt the password
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      const savedUser = await newUser.save();
      // create a JWT token
      const token = jwt.sign({ id: savedUser._id }, config.jwtsecret, {
        expiresIn: 3600,
      });
      console.log(token);
      return response.status(200).json({
        token,
        user: {
          name: savedUser.name,
          email: savedUser.email,
          id: savedUser._id,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (request, response, next) => {
    try {
      const { email, password } = request.body;
      if (!email || !password) {
        return response
          .status(400)
          .json({ message: "Please enter a valid email and password." });
      }
      const user = await UserModel.findOne({ email });
      if (!user) {
        return response.status(400).json({ message: "User does not exists." });
      }
      if (user) {
        const authenticationStatus = bcrypt.compare(password, user.password);
        if (!authenticationStatus) {
          return response.status(400).json({ message: "Password is invalid" });
        }

        const token = jwt.sign({ id: user._id }, config.jwtsecret, {
          expiresIn: 3600,
        });
        return response.json({
          token,
          user: {
            name: user.name,
            email: user.email,
            id: user._id,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getUser: async (request, response, next) => {
    try {
      const user = await UserModel.findById(request.user.id).select(
        "-password"
      );
      response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
};
