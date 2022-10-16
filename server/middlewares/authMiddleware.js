const config = require("../../config/config");
const jwt = require("jsonwebtoken");

const auth = (request, response, next) => {
  const token = request.header("x-auth-token");
  if (!token) {
    return response
      .status(401)
      .send({ message: "No token authorisation denied." });
  }
  try {
    const decoded = jwt.verify(token, config.jwtsecret);
    request.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = auth;
