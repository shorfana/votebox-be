const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

// Route untuk mendapatkan profil pengguna, hanya bisa diakses jika token valid
router.get("/profile", verifyToken, getUserProfile);

module.exports = router;
