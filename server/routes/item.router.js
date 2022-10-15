const { request } = require("express");
const express = require("express");
const router = express.Router();
const itemRouter = require("../controllers/itemController");
router.get("/items", itemRouter.getItems);
router.get("/items/:id", itemRouter.getSingleItem);
router.post("/items", itemRouter.addItem);

module.exports = router;
