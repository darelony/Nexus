import express from "express";
import cors from "cors";
import { auth } from "./middleware/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

// Protected route example
app.get("/api/admin/data", auth, (req, res) => {
  res.json({ message: "Secure admin data" });
});
app.use("/api/admin", require("./routes/adminRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
