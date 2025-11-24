const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Course = require("./Course");
const ExamPeriod = require("./ExamPeriod");

const Exam = sequelize.define("Exam", {
  date: DataTypes.DATE,
  start_time: DataTypes.STRING,
  end_time: DataTypes.STRING
});

Exam.belongsTo(Course, { foreignKey: "course_id" });
Exam.belongsTo(ExamPeriod, { foreignKey: "period_id" });

module.exports = Exam;
