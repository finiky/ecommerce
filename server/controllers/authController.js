const UserModel = require("../models/UserModel");
module.exports = {
  signUp: async (request, response, next) => {
    try {
      const { name, email, password, registerDate } = request.body;
      if (!name || !email || !password) {
        return response
          .status(400)
          .send({ message: "Please enter all fields" });
      }
      if (await UserModel.findOne({ email })) {
        return response
          .status(400)
          .send({ message: "User with the email Id already exists" });
      }
      const newUser = new UserModel({ name, email, password, registerDate });
      await newUser.save();
      return response.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
};
