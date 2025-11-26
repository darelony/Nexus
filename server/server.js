// server.js
//require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const sequelize = require("./config/db");
const User = require("./models/User");

const app = express();

// 🔹 Parsiranje JSON tela
app.use(express.json());

// 🔹 Dozvoljeni frontend portovi
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://127.0.0.1:3002",
  "http://127.0.0.1:3003",
];

// 🔹 CORS konfiguracija
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// 🔹 Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "nexus_secret",
    resave: false,
    saveUninitialized: false,
  })
);

// 🔹 Rute
app.use("/api/auth", require("./routhes/authRoutes"));

// 🔹 Pokretanje servera i sinhronizacija baze
sequelize
  .sync() // bez force – ne briše postojeće podatke
  .then(async () => {
    const bcrypt = require("bcrypt");

    const defaultUsers = [
      { username: "admin",      email: "admin@nexus.edu",     password: "admin123",   role: "admin"   },
      { username: "student123", email: "student@nexus.edu",   password: "student123", role: "student" },
      { username: "profesor123",email: "profesor@nexus.edu",  password: "profesor123",role: "teacher" },
    ];

    for (const u of defaultUsers) {
      const [user, created] = await User.findOrCreate({
        where: { username: u.username },
        defaults: {
          email: u.email,
          password: await bcrypt.hash(u.password, 10),
          role: u.role,
        },
      });
      if (created) console.log(`✅ Created ${u.role}: ${u.username} / ${u.password}`);
      else         console.log(`⏭️  ${u.username} already exists`);
    }

    app.listen(5000, () =>
      console.log("✅ Server running on http://localhost:5000")
    );
  })
  .catch((err) => console.error("❌ Database sync error:", err));