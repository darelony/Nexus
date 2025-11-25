const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Course = require("./Course");
const User = require("./User");

const Material = sequelize.define("Material", {
  title: DataTypes.STRING,
  url: DataTypes.STRING
});

Material.belongsTo(Course, { foreignKey: "course_id" });
Material.belongsTo(User, { as: "profesor", foreignKey: "profesor_id" });

module.exports = Material;
