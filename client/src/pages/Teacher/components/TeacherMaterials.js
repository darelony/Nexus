import React, { useState } from "react";

export default function TeacherMaterials() {
  const [files, setFiles] = useState([
    { id: 1, name: "Predavanje1.pdf" },
    { id: 2, name: "Zadaci.docx" },
  ]);

  const handleUpload = () => {
    alert("Upload fajla (mockup)");
  };

  const handleDelete = (id) => {
    setFiles(files.filter(f => f.id !== id));
  };

  return (
    <div className="card col-12">
      <h3>Materijali predmeta</h3>
      <button className="btn-primary" onClick={handleUpload}>Dodaj novi fajl</button>
      <ul className="list-compact" style={{ marginTop: "12px" }}>
        {files.map(f => (
          <li key={f.id}>
            {f.name} 
            <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(f.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
