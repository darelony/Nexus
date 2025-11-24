// seedUsers.js
const bcrypt = require("bcrypt");
const User = require("./models/User"); // putanja do User.js, prilagodi ako je drugačije

async function seedUsers() {
  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "student", password: "student123", role: "student" },
    { username: "profesor", password: "profesor123", role: "teacher" },
  ];

  for (let u of users) {
    // proveravamo da li korisnik već postoji
    const existing = await User.findOne({ where: { username: u.username } });
    if (existing) {
      console.log(`⚠️ User "${u.username}" already exists, skipping.`);
      continue;
    }

    // kreiramo korisnika
    await User.create(u); // beforeCreate hook u User.js će hešovati lozinku
    console.log(`✅ User "${u.username}" created.`);
  }

  console.log("🎉 All users seeded!");
  process.exit();
}

seedUsers();
