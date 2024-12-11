const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Voter = sequelize.define(
  "Voter",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    principalid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING, // Simpan hash password, jadi tipe string sudah cukup
      allowNull: false, // Kolom ini wajib diisi
    },
    createdat: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false, // Disable automatic createdAt and updatedAt handling
  }
);

module.exports = Voter;
