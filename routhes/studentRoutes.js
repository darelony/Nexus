const express = require("express");
const ExamApplication = require("../models/ExamApplication");
const Exam = require("../models/Exam");
const Student = require("../models/Student");
const router = express.Router();

router.post("/exams/:id/register", async (req, res) => {
  const exam = await Exam.findByPk(req.params.id);
  if (!exam) return res.status(404).json({ error: "Exam not found" });
  const now = new Date();
  const diffDays = (new Date(exam.date) - now) / (1000 * 60 * 60 * 24);
  if (diffDays < 7) return res.status(400).json({ error: "Too late to register" });
  await ExamApplication.create({ exam_id: exam.id, student_id: req.body.student_id, status: "registered" });
  res.json({ message: "Exam registered" });
});

module.exports = router;
