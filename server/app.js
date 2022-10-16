const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth.router");
const itemRouter = require("./routes/item.router");
const cartRouter = require("./routes/cart.router");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
app.use(cors());
app.use(express.json());

app.get("/", async (request, response, next) => {
  response.status(200).send({ message: "Hello Server!" });
});

app.use("/", authRouter);
app.use("/", itemRouter);
app.use("/", cartRouter);

//errorHandler Middleware;
app.use(errorHandler);

module.exports = app;
