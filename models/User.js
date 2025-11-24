const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // putanja do db.js
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "teacher", "student"),
    allowNull: false,
  },
  resetToken: DataTypes.STRING,
  resetTokenExpire: DataTypes.DATE,
});

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;
