const express = require("express");
const authController = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/user", auth, authController.getUser);

module.exports = router;
