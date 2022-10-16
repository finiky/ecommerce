const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

router.post("/cart/:id", cartController.addToCart);
router.get("/cart/:id", cartController.getCartItems);
router.delete("/cart/:userId/:itemId", cartController.deleteItem);

module.exports = router;
