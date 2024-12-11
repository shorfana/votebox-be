const crypto = require("crypto");
const { generateToken } = require("../config/jwtConfig");
const Voter = require("../models/Voter");

// Fungsi hashing kombinasi SHA-1 dan MD5
const hashPassword = (password) => {
  const sha1Hash = crypto.createHash("sha1").update(password).digest("hex");
  const md5Hash = crypto.createHash("md5").update(sha1Hash).digest("hex");
  return md5Hash;
};

const register = async (req, res) => {
  const { principalid, email, password, fullname } = req.body;

  // Validasi input
  if (!principalid || !email || !password || !fullname) {
    return res
      .status(400)
      .json({
        message: "Principal ID, email, password, and fullname are required!",
      });
  }

  try {
    // Periksa apakah principalid sudah terdaftar
    let voter = await Voter.findOne({ where: { principalid } });

    if (voter) {
      return res
        .status(400)
        .json({ message: "Principal ID already registered!" });
    }

    // Hash password menggunakan SHA-1 lalu MD5
    const hashedPassword = hashPassword(password);

    // Buat pengguna baru
    voter = await Voter.create({
      principalid,
      email,
      password: hashedPassword,
      fullname, // Tambahkan fullname ke dalam database
    });

    // Generate token untuk pengguna baru
    const token = generateToken({
      principalid: voter.principalid,
      email: voter.email,
    });

    return res.status(201).json({
      message: "Registration successful!",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error!", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required!" });
  }

  try {
    // Cari pengguna berdasarkan email
    let voter = await Voter.findOne({ where: { email } });

    if (!voter) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Hash password yang dimasukkan dan cocokkan dengan yang di database
    const hashedPassword = hashPassword(password);
    if (voter.password !== hashedPassword) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    // Generate token untuk login
    const token = generateToken({
      principalid: voter.principalid,
      email: voter.email,
    });

    return res.status(200).json({
      message: "Login successful!",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error!", error });
  }
};

module.exports = { register, login };
