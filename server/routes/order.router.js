const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

router.get("/order/:id", orderController.getOrders);
router.post("/order/:id", orderController.checkout);

module.exports = router;