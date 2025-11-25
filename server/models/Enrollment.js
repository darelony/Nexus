const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Course = require("./Course");

const Enrollment = sequelize.define("Enrollment", {});

Enrollment.belongsTo(User, { as: "student", foreignKey: "student_id" });
Enrollment.belongsTo(Course, { foreignKey: "course_id" });

module.exports = Enrollment;
