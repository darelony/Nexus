const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Announcement = sequelize.define("Announcement", {
  title: DataTypes.STRING,
  body: DataTypes.TEXT
});

Announcement.belongsTo(User, { as: "autor", foreignKey: "autor_id" });

module.exports = Announcement;
