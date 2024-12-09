const express = require("express");
const { register, login } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

// Pendaftaran dan Login
router.post("/register", register);
router.post("/login", login);

// Rute untuk halaman dashboard yang memerlukan autentikasi
router.get("/dashboard", verifyToken, (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to your dashboard", user: req.user });
});

module.exports = router;
