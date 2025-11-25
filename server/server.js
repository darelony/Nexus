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
      // dozvoljava i requests sa Postmana / server-side (origin = undefined)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// 🔹 Express session
app.use(
  session({
    secret: "nexus_secret",
    resave: false,
    saveUninitialized: false,
  })
);

// 🔹 Rute
app.use("/api/auth", require("./routhes/authRoutes"));

// 🔹 Pokretanje servera i sinhronizacija baze
sequelize
  .sync()
  .then(async () => {
    // Provera da li admin već postoji
    const admin = await User.findOne({ where: { username: "admin" } });
    if (!admin) {
      await User.create({
        username: "admin",
        email: "admin@nexus.edu",
        password: "admin123",
        role: "admin",
      });
      console.log("✅ Default admin created: admin / admin123");
    }

    // Pokretanje servera
    app.listen(5000, () =>
      console.log("✅ Server running on http://localhost:5000")
    );
  })
  .catch((err) => console.error("❌ Database sync error:", err));
