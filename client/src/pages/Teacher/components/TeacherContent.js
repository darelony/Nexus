import React from "react";
import TeacherSubjects from "./TeacherSubjects";
import TeacherMaterials from "./TeacherMaterials";
import TeacherStudents from "./TeacherStudents";
import TeacherGrades from "./TeacherGrades";
import TeacherNotifications from "./TeacherNotifications";

export default function TeacherContent({ active, user }) {
  const renderContent = () => {
    switch (active) {
      case "mojiPredmeti": return <TeacherSubjects />;
      case "materijali": return <TeacherMaterials />;
      case "prijavljeniStudenti": return <TeacherStudents />;
      case "unosOcena": return <TeacherGrades />;
      case "obavestenja": return <TeacherNotifications />;
      default: return <div>Odaberi opciju sa leve strane.</div>;
    }
  };

  return (
    <main className="teacher-main">
      <header className="teacher-header">
        <h2>
          {active === "mojiPredmeti" && "Moji predmeti"}
          {active === "materijali" && "Materijali"}
          {active === "prijavljeniStudenti" && "Prijavljeni studenti"}
          {active === "unosOcena" && "Unos ocena"}
          {active === "obavestenja" && "Obaveštenja"}
        </h2>
        <div className="header-meta">
          {user && (
            <>
              <div className="meta-name">{user.name}</div>
              <div className="meta-info">{user.department}</div>
            </>
          )}
        </div>
      </header>

      <section className="teacher-content">{renderContent()}</section>
    </main>
  );
}
