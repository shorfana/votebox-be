const jwt = require("jsonwebtoken");

const secretKey = "hnUWh5NdY3L2jNcJB06wCks6tF5KMgxK9jm30azvn4E="; // Ganti dengan kunci rahasia yang lebih aman

// Fungsi untuk menghasilkan token JWT
const generateToken = (user) => {
  return jwt.sign(user, secretKey, { expiresIn: "1h" }); // Token berlaku selama 1 jam
};

module.exports = { generateToken };
