const { generateToken } = require("../config/jwtConfig");
const Voter = require("../models/Voter");

// Register a new user (requires both principalid and email)
const register = async (req, res) => {
  const { principalid, email } = req.body;

  // Validate input for registration
  if (!principalid || !email) {
    return res
      .status(400)
      .json({ message: "Principal ID and email are required!" });
  }

  try {
    // Check if the principalid already exists
    let voter = await Voter.findOne({ where: { principalid } });

    if (voter) {
      return res
        .status(400)
        .json({ message: "Principal ID already registered!" });
    }

    // Create a new voter (registration)
    voter = await Voter.create({ principalid, email });

    // Generate JWT token for registration
    const token = generateToken({
      principalid: voter.principalid,
      email: voter.email,
    });

    return res.status(201).json({
      message: "Registration successful!",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

// Login an existing user (requires email only)
const login = async (req, res) => {
  const { email } = req.body;

  // Validate input for login
  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }

  try {
    // Check if the voter with this email exists
    let voter = await Voter.findOne({ where: { email } });

    if (!voter) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Generate JWT token for login
    const token = generateToken({
      principalid: voter.principalid,
      email: voter.email,
    });

    return res.status(200).json({
      message: "Login successful!",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

module.exports = { register, login };
