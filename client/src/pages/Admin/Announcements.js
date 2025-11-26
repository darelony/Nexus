// Announcements.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Announcements() {
const [announcements, setAnnouncements] = useState([]);
const [title, setTitle] = useState("");
const [body, setBody] = useState("");

useEffect(() => {
axios.get("[http://localhost:5000/announcements](http://localhost:5000/announcements)")
.then(res => setAnnouncements(res.data))
.catch(err => console.log(err));
}, []);

const handleAdd = () => {
axios.post("[http://localhost:5000/announcements](http://localhost:5000/announcements)", { title, body })
.then(res => setAnnouncements(prev => [...prev, res.data]))
.catch(err => console.log(err));
setTitle("");
setBody("");
}

return ( <div> <h2>Obaveštenja</h2> <div>
<input placeholder="Naslov" value={title} onChange={e => setTitle(e.target.value)} />
<textarea placeholder="Sadržaj" value={body} onChange={e => setBody(e.target.value)}></textarea> <button onClick={handleAdd}>Dodaj</button> </div> <ul>
{announcements.map(a => ( <li key={a.id}><strong>{a.title}:</strong> {a.body}</li>
))} </ul> </div>
);
}
