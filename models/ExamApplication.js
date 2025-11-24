const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Exam = require("./Exam");
const Course = require("./Course");

const ExamApplication = sequelize.define("ExamApplication", {
  status: DataTypes.STRING, // registered / passed / failed
  grade: DataTypes.INTEGER
});

ExamApplication.belongsTo(User, { as: "student", foreignKey: "student_id" });
ExamApplication.belongsTo(Course, { foreignKey: "course_id" });
ExamApplication.belongsTo(Exam, { foreignKey: "exam_id" });

module.exports = ExamApplication;
