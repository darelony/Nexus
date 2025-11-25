const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Course = require("./Course");

const Grade = sequelize.define("Grade", {
  grade: DataTypes.INTEGER,
  date: DataTypes.DATE
});

Grade.belongsTo(User, { as: "student", foreignKey: "student_id" });
Grade.belongsTo(Course, { foreignKey: "course_id" });

module.exports = Grade;
