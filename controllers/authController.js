const { generateToken } = require("../config/jwtConfig");
const Voter = require("../models/Voter");

const register = async (req, res) => {
  const { principalid, email } = req.body;

  if (!principalid || !email) {
    return res
      .status(400)
      .json({ message: "Principal ID and email are required!" });
  }

  try {
    let voter = await Voter.findOne({ where: { principalid } });

    if (voter) {
      return res
        .status(400)
        .json({ message: "Principal ID already registered!" });
    }

    voter = await Voter.create({ principalid, email });

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

const login = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }

  try {
    let voter = await Voter.findOne({ where: { email } });

    if (!voter) {
      return res.status(404).json({ message: "User not found!" });
    }

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
