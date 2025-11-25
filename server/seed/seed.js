const { User, Course, Enrollment } = require("../models");

(async () => {
  try {
    // Admin
    const admin = await User.create({
      username: "admin",
      password: "admin123",
      role: "admin",
    });

    // Profesori
    const profesori = [];
    for (let i = 1; i <= 10; i++) {
      const profesor = await User.create({
        username: `profesor${i}`,
        password: "teacher123",
        role: "teacher",
      });
      profesori.push(profesor);
    }

    // Studenti
    const studenti = [];
    for (let i = 1; i <= 50; i++) {
      const student = await User.create({
        username: `student${i}`,
        password: "student123",
        role: "student",
      });
      studenti.push(student);
    }

    // Predmeti
    const predmeti = [];
    for (let i = 1; i <= 20; i++) {
      const profesor = profesori[i % profesori.length];
      const predmet = await Course.create({
        naziv: `Predmet${i}`,
        sifra: `PRED${i}`,
        ESPB: 6,
        opis: "Opis predmeta",
        profesor_id: profesor.id,
      });
      predmeti.push(predmet);
    }

    // Upisivanje slučajnih studenata na predmete
    for (const student of studenti) {
      for (let i = 0; i < 5; i++) {
        const course = predmeti[Math.floor(Math.random() * predmeti.length)];
        await Enrollment.create({ student_id: student.id, course_id: course.id });
      }
    }

    console.log("🎉 Seedovanje baze gotovo!");
    process.exit();
  } catch (error) {
    console.error("❌ Greška prilikom seedovanja:", error);
  }
})();
