const sequelize = require("../config/db");
const User = require("./User");
const Course = require("./Course");
const Enrollment = require("./Enrollment");
const ExamPeriod = require("./ExamPeriod");
const ExamApplication = require("./ExamApplication");
const Grade = require("./Grade");
const Material = require("./Material");
const Announcement = require("./Announcement");

// USERS → COURSES (profesor)
User.hasMany(Course, { as: "predmeti_predaje", foreignKey: "profesor_id", onDelete: "CASCADE" });
Course.belongsTo(User, { as: "profesor", foreignKey: "profesor_id" });

// USERS → ENROLLMENTS (student)
User.hasMany(Enrollment, { as: "upisi", foreignKey: "student_id", onDelete: "CASCADE" });
Enrollment.belongsTo(User, { as: "student", foreignKey: "student_id" });

// COURSES → ENROLLMENTS
Course.hasMany(Enrollment, { as: "upisi", foreignKey: "course_id", onDelete: "CASCADE" });
Enrollment.belongsTo(Course, { foreignKey: "course_id" });

// EXAM_PERIODS → EXAM_APPLICATIONS
ExamPeriod.hasMany(ExamApplication, { foreignKey: "period_id", onDelete: "CASCADE" });
ExamApplication.belongsTo(ExamPeriod, { foreignKey: "period_id" });

// USERS → EXAM_APPLICATIONS
User.hasMany(ExamApplication, { as: "prijave", foreignKey: "student_id", onDelete: "CASCADE" });
ExamApplication.belongsTo(User, { as: "student", foreignKey: "student_id" });

// COURSES → EXAM_APPLICATIONS
Course.hasMany(ExamApplication, { foreignKey: "course_id", onDelete: "CASCADE" });
ExamApplication.belongsTo(Course, { foreignKey: "course_id" });

// USERS → GRADES
User.hasMany(Grade, { as: "ocene", foreignKey: "student_id", onDelete: "CASCADE" });
Grade.belongsTo(User, { as: "student", foreignKey: "student_id" });

// COURSES → GRADES
Course.hasMany(Grade, { foreignKey: "course_id", onDelete: "CASCADE" });
Grade.belongsTo(Course, { foreignKey: "course_id" });

// COURSES → MATERIALS
Course.hasMany(Material, { as: "materijali", foreignKey: "course_id", onDelete: "CASCADE" });
Material.belongsTo(Course, { foreignKey: "course_id" });

// USERS → ANNOUNCEMENTS
User.hasMany(Announcement, { as: "objave", foreignKey: "autor_id", onDelete: "CASCADE" });
Announcement.belongsTo(User, { as: "autor", foreignKey: "autor_id" });

module.exports = {
  sequelize,
  User,
  Course,
  Enrollment,
  ExamPeriod,
  ExamApplication,
  Grade,
  Material,
  Announcement
};
