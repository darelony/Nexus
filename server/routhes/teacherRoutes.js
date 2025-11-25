const express = require("express");
const Material = require("../../models/Material");
const ExamApplication = require("../../models/ExamApplication");
const Grade = require("../../models/Grade");
const router = express.Router();

router.post("/materials", async (req, res) => {
  const { course_id, teacher_id, title, url } = req.body;
  const m = await Material.create({ course_id, teacher_id, title, url });
  res.json(m);
});

router.post("/grade", async (req, res) => {
  const { student_id, course_id, grade } = req.body;
  const g = await Grade.create({ student_id, course_id, grade, date: new Date() });
  await ExamApplication.update({ status: "passed", grade }, { where: { student_id } });
  res.json(g);
});

module.exports = router;
