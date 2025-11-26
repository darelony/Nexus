// Courses.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Courses() {
const [courses, setCourses] = useState([]);
const [name, setName] = useState("");

useEffect(() => {
axios.get("[http://localhost:5000/courses](http://localhost:5000/courses)")
.then(res => setCourses(res.data))
.catch(err => console.log(err));
}, []);

const handleAdd = () => {
axios.post("[http://localhost:5000/courses](http://localhost:5000/courses)", { name })
.then(res => setCourses(prev => [...prev, res.data]))
.catch(err => console.log(err));
setName("");
}

return ( <div> <h2>Predmeti</h2>
<input placeholder="Ime predmeta" value={name} onChange={e => setName(e.target.value)} /> <button onClick={handleAdd}>Dodaj</button> <ul>
{courses.map(c => <li key={c.id}>{c.name}</li>)} </ul> </div>
);
}
