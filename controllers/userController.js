const Voter = require("../models/Voter");

const getUserProfile = async (req, res) => {
  try {
    // Mengambil data pengguna berdasarkan user ID dari token
    const voter = await Voter.findOne({
      where: { principalid: req.user.principalid },
    });

    if (!voter) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(voter);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getUserProfile };
