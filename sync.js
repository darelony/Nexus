const { sequelize } = require("./models");

(async () => {
  try {
    await sequelize.sync({ force: true }); // force: true briše postojeće tabele i kreira nove
    console.log("✅ Baza uspešno sinhronizovana!");
    process.exit();
  } catch (error) {
    console.error("❌ Greška pri sinhronizaciji:", error);
  }
})();
