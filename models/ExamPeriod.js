const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ExamPeriod = sequelize.define("ExamPeriod", {
  name: DataTypes.STRING,
  start_date: DataTypes.DATE,
  end_date: DataTypes.DATE
});

module.exports = ExamPeriod;
