const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Course = sequelize.define("Course", {
  naziv: { type: DataTypes.STRING, allowNull: false },
  sifra: { type: DataTypes.STRING, allowNull: false, unique: true },
  ESPB: { type: DataTypes.INTEGER, allowNull: false },
  opis: { type: DataTypes.TEXT },
});

module.exports = Course;
