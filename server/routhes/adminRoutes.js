const express = require("express");
const User = require("../models/User");
const Course = require("../models/Course");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Announcement = require("../models/Announcement");
const router = express.Router();

router.get("/students", async (_, res) => {
  const students = await Student.findAll({ include: [User] });
  res.json(students);
});

router.post("/students", async (req, res) => {
  const { username, password, first_name, last_name, year } = req.body;
  const user = await User.create({ username, password_hash: password, role: "student", first_name, last_name });
  const student = await Student.create({ user_id: user.id, year_of_study: year });
  res.json(student);
});

router.post("/courses", async (req, res) => {
  const { name, espb, semester, teacher_id } = req.body;
  const course = await Course.create({ name, espb, semester, teacher_id });
  res.json(course);
});

router.post("/announcements", async (req, res) => {
  const { title, body } = req.body;
  const a = await Announcement.create({ title, body });
  res.json(a);
});

module.exports = router;
