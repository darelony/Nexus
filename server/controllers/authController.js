// authController.js
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const db     = require('../models');        // prilagodi putanju
const { auth }= require('../middleware/auth'); // ako ti treba u istom fajlu

// ----------- helpers -----------
const signToken = (id, email, role) =>
  jwt.sign({ id, email, role }, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });

// ----------- kontroleri -----------
exports.register = async (req, res) => {
  try {
    const { email, password, fullName, role = 'student' } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const existing = await db.User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 12);
    const user   = await db.User.create({ email, password: hashed, fullName, role });

    const token = signToken(user.id, user.email, user.role);
    res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = await db.User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signToken(user.id, user.email, user.role);
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/auth/me  – za ProtectedRoute
exports.me = (req, res) => {
  // "auth" middleware vec dekodira token i stavlja req.user
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  res.json(req.user);   // {id, email, role}
};