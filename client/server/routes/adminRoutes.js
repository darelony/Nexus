const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

router.get("/dashboard", auth("admin"), (req, res) => {
  res.json({ message: "Welcome Admin, you are authorized!" });
});

module.exports = router;
