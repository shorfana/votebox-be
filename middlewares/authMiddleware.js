const jwt = require("jsonwebtoken");
const secretKey = "hnUWh5NdY3L2jNcJB06wCks6tF5KMgxK9jm30azvn4E="; // Sama dengan yang digunakan di generateToken

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Ambil token dari header Authorization

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Menyimpan data pengguna yang sudah didekode ke request
    next(); // Lanjutkan ke route berikutnya
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
