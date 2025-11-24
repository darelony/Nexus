import React from "react";

export default function TeacherSubjects() {
  // primer podaci
  const subjects = [
    { id: 1, name: "Programiranje 1", students: 24 },
    { id: 2, name: "Baze podataka", students: 18 },
    { id: 3, name: "Web development", students: 30 },
  ];

  return (
    <div className="card col-12">
      <h3>Moji predmeti</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Predmet</th>
            <th>Broj studenata</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subj) => (
            <tr key={subj.id}>
              <td>{subj.name}</td>
              <td>{subj.students}</td>
              <td>
                <button className="btn-primary">Pregled studenata</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
