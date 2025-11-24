import React, { useState } from "react";

export default function TeacherNotifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Novi test iz Programiranja 1 je dostupan." },
    { id: 2, text: "Predavanje iz Baza podataka pomereno za utorak." },
  ]);
  const [newNote, setNewNote] = useState("");

  const addNotification = () => {
    if (!newNote) return;
    setNotifications([...notifications, { id: Date.now(), text: newNote }]);
    setNewNote("");
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="card col-12">
      <h3>Obaveštenja studentima</h3>
      <input 
        type="text" 
        placeholder="Nova poruka" 
        value={newNote}
        onChange={e => setNewNote(e.target.value)}
        style={{ padding: "6px", width: "100%", borderRadius: "6px" }}
      />
      <button className="btn-primary" style={{ marginTop: "6px" }} onClick={addNotification}>Pošalji</button>

      <ul className="list-compact" style={{ marginTop: "12px" }}>
        {notifications.map(n => (
          <li key={n.id}>
            {n.text} 
            <button style={{ marginLeft: "10px" }} onClick={() => deleteNotification(n.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
