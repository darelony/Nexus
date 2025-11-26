// ExamPeriods.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ExamPeriods() {
const [periods, setPeriods] = useState([]);
const [name, setName] = useState("");
const [start, setStart] = useState("");
const [end, setEnd] = useState("");

useEffect(() => {
axios.get("[http://localhost:5000/examPeriods](http://localhost:5000/examPeriods)")
.then(res => setPeriods(res.data))
.catch(err => console.log(err));
}, []);

const handleAdd = () => {
axios.post("[http://localhost:5000/examPeriods](http://localhost:5000/examPeriods)", { name, startDate: start, endDate: end })
.then(res => setPeriods(prev => [...prev, res.data]))
.catch(err => console.log(err));
setName(""); setStart(""); setEnd("");
}

return ( <div> <h2>Ispitni Rokovi</h2>
<input placeholder="Ime roka" value={name} onChange={e => setName(e.target.value)} />
<input type="date" value={start} onChange={e => setStart(e.target.value)} />
<input type="date" value={end} onChange={e => setEnd(e.target.value)} /> <button onClick={handleAdd}>Dodaj</button> <ul>
{periods.map(p => <li key={p.id}>{p.name} ({p.startDate} - {p.endDate})</li>)} </ul> </div>
);
}
