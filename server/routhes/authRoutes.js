const express = require("express");
const router  = express.Router();
const bcrypt  = require("bcrypt");
const crypto  = require("crypto");
const jwt     = require("jsonwebtoken");      // ⬅ dodato
const User    = require("../models/User");

/* =====================
   🔐 LOGIN
====================== */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username },
      "nexus_jwt_secret",
      { expiresIn: "6h" }
    );

    res.json({ 
      message: "Login successful", 
      token,
      role: user.role 
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* =====================
   📩 FORGOT PASSWORD (no email version)
===================== */
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 1000 * 60 * 10; // 10 min
    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    console.log("🔗 RESET LINK:", resetLink);

    res.json({
      message: "Reset link generated — check your backend console for the link.",
    });
  } catch (err) {
    console.error("❌ Forgot password error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* =====================
   🔁 RESET PASSWORD 
===================== */
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({ where: { resetToken: token } });
    if (!user || user.resetTokenExpire < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    user.resetToken = null;
    user.resetTokenExpire = null;
    await user.save();

    res.json({ message: "✅ Password reset successful!" });
  } catch (err) {
    console.error("❌ Reset password error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* =====================
   🙋‍♂️ GET CURRENT USER  (za ProtectedRoute)
===================== */
router.get("/me", async (req, res) => {
  const hdr = req.headers.authorization;
  if (!hdr || !hdr.startsWith("Bearer "))
    return res.status(401).json({ error: "No token provided" });

  const token = hdr.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "nexus_jwt_secret");
    // decoded = { id, role, username, iat, exp }
    res.json({ id: decoded.id, role: decoded.role, username: decoded.username });
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});

module.exports = router;