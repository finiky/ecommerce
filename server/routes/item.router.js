const express = require("express");
const router = express.Router();
const itemRouter = require("../controllers/itemController");

router.get("/items", itemRouter.getItems);
router.get("/items/:id", itemRouter.getSingleItem);
router.post("/items", itemRouter.addItem);
router.put("/items/:id", itemRouter.updateItem);
router.delete("/items/:id", itemRouter.removeItem);

module.exports = router;
