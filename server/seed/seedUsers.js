// seedUsers.js
const bcrypt = require("bcrypt");
const sequelize = require("../config/db"); // putanja do db.js
const User = require("../models/User");    // putanja do User.js

async function seedUsers() {
  try {
    // Kreira sve tabele koje nedostaju
    await sequelize.sync({ force: false }); // force: true briše stare tabele, false samo kreira ako ne postoji

    const users = [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "student", password: "student123", role: "student" },
      { username: "profesor", password: "profesor123", role: "teacher" },
    ];

    for (let u of users) {
      // Proveravamo da li korisnik već postoji
      const existing = await User.findOne({ where: { username: u.username } });
      if (existing) {
        console.log(`⚠️ User "${u.username}" already exists, skipping.`);
        continue;
      }

      // Kreiramo korisnika (lozinka se hešuje u beforeCreate hook-u u User.js)
      await User.create(u);
      console.log(`✅ User "${u.username}" created.`);
    }

    console.log("🎉 All users seeded!");
    process.exit();
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seedUsers();
