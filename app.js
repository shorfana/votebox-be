const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Sinkronisasi database
sequelize.sync({ force: false }).then(() => {
  console.log("Database connected!");
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
