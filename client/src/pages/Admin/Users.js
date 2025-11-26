// Users.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Users() {
const [users, setUsers] = useState([]);
const [name, setName] = useState("");
const [role, setRole] = useState("student");

useEffect(() => {
axios.get("[http://localhost:5000/users](http://localhost:5000/users)")
.then(res => setUsers(res.data))
.catch(err => console.log(err));
}, []);

const handleAdd = () => {
axios.post("[http://localhost:5000/users](http://localhost:5000/users)", { name, role })
.then(res => setUsers(prev => [...prev, res.data]))
.catch(err => console.log(err));
setName(""); setRole("student");
}

return ( <div> <h2>Korisnici</h2>
<input placeholder="Ime korisnika" value={name} onChange={e => setName(e.target.value)} />
<select value={role} onChange={e => setRole(e.target.value)}> <option value="student">Student</option> <option value="teacher">Profesor</option> </select> <button onClick={handleAdd}>Dodaj</button> <ul>
{users.map(u => <li key={u.id}>{u.name} ({u.role})</li>)} </ul> </div>
);
}
