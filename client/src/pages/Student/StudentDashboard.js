import React, { useState, useEffect } from "react";
import "./StudentDashboard.css";
import StudentProfile from "./components/StudentProfile";
import StudentSubjects from "./components/StudentSubjects";
import StudentEnroll from "./components/StudentEnroll";
import StudentExams from "./components/StudentExams";
import StudentGrades from "./components/StudentGrades";

export default function StudentDashboard() {
  const [active, setActive] = useState("profile");
  const [user, setUser] = useState(null);

  useEffect(() => {
   
    async function loadProfile() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/student/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          
          setUser({
            name: "Student User",
            index: "2024/123",
            email: "student@nexus.edu",
            year: "2",
            program: "Computer Science",
          });
        } else {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        setUser({
          name: "Student User",
          index: "2024/123",
          email: "student@nexus.edu",
          year: "2",
          program: "Computer Science",
        });
      }
    }
    loadProfile();
  }, []);

  return (
    <div className="student-shell">
      <aside className="student-side">
        <div className="student-brand">
          <img src="/logo.png" alt="Nexus" className="student-logo" />
          <div className="student-brand-title">
            <div className="s-brand-main">Nexus</div>
            <div className="s-brand-sub">Student Panel</div>
          </div>
        </div>

        <nav className="student-nav">
          <button
            className={`nav-btn ${active === "profile" ? "active" : ""}`}
            onClick={() => setActive("profile")}
          >
            🧑‍🎓 Moj profil
          </button>

          <button
            className={`nav-btn ${active === "subjects" ? "active" : ""}`}
            onClick={() => setActive("subjects")}
          >
            📚 Predmeti
          </button>

          <button
            className={`nav-btn ${active === "enroll" ? "active" : ""}`}
            onClick={() => setActive("enroll")}
          >
            ➕ Upis na predmet
          </button>

          <button
            className={`nav-btn ${active === "exams" ? "active" : ""}`}
            onClick={() => setActive("exams")}
          >
            📝 Prijava ispita
          </button>

          <button
            className={`nav-btn ${active === "grades" ? "active" : ""}`}
            onClick={() => setActive("grades")}
          >
            ⭐ Ocene & materijali
          </button>

          <div className="nav-spacer" />

          <button
            className="nav-btn logout"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              window.location.href = "/login";
            }}
          >
            🚪 Odjava
          </button>
        </nav>

        <div className="side-footer">
          <small>© {new Date().getFullYear()} Nexus University</small>
        </div>
      </aside>

      <main className="student-main">
        <header className="student-header">
          <h2>
            {active === "profile" && "Moj profil"}
            {active === "subjects" && "Predmeti"}
            {active === "enroll" && "Upis na predmet"}
            {active === "exams" && "Prijava ispita"}
            {active === "grades" && "Ocene i materijali"}
          </h2>

          <div className="header-meta">
            {user && (
              <>
                <div className="meta-name">{user.name}</div>
                <div className="meta-info">
                  {user.program} • {user.year}. godina
                </div>
              </>
            )}
          </div>
        </header>

        <section className="student-content">
          {active === "profile" && <StudentProfile user={user} />}
          {active === "subjects" && <StudentSubjects />}
          {active === "enroll" && <StudentEnroll />}
          {active === "exams" && <StudentExams />}
          {active === "grades" && <StudentGrades />}
        </section>
      </main>
    </div>
  );
}
