const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth.router");
const itemRouter = require("./routes/item.router");
const cartRouter = require("./routes/cart.router");
const orderRouter = require("./routes/order.router");
const errorHandler = require("./middlewares/errorHandlerMiddleware");

//Middlewares
app.use(cors());
app.use(express.json());

//Endpoints
app.use("/", authRouter);
app.use("/", itemRouter);
app.use("/", cartRouter);
app.use("/", orderRouter);

//errorHandler Middleware;
app.use(errorHandler);

module.exports = app;
