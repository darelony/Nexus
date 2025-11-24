import React, { useState, useEffect } from "react";
import "./TeacherDashboard.css";
import TeacherSidebar from "./components/TeacherSidebar";
import TeacherContent from "./components/TeacherContent";

export default function TeacherDashboard() {
  const [active, setActive] = useState("mojiPredmeti");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/teacher/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          setUser({
            name: "Profesor User",
            email: "profesor@nexus.edu",
            department: "Computer Science",
          });
        } else {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        setUser({
          name: "Profesor User",
          email: "profesor@nexus.edu",
          department: "Computer Science",
        });
      }
    }
    loadProfile();
  }, []);

  return (
    <div className="teacher-shell">
      <TeacherSidebar active={active} setActive={setActive} />
      <TeacherContent active={active} user={user} />
    </div>
  );
}
