import { useState, useEffect } from "react";
import StudentList from "./components/StudentList.jsx";
import StudentModal from "./components/StudentModal.jsx";
import DeleteModal from "./components/DeleteModal.jsx";
import { loadStudents, nextId, STORAGE_KEY, STATUSES } from "./utils.js";

export default function App() {
  const [students, setStudents] = useState(loadStudents);
  const [modal, setModal] = useState(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(students)), [students]);

  const addStudent = (data) => setStudents([...students, { ...data, id: nextId(students) }]);
  const editStudent = (id, data) => setStudents(students.map((s) => (s.id === id ? { ...s, ...data } : s)));
  const deleteStudent = (id) => setStudents(students.filter((s) => s.id !== id));

  const save = (data) => { modal.student ? editStudent(modal.student.id, data) : addStudent(data); setModal(null); };
  const visible = students.filter((s) =>
    (status === "All" || s.status === status) &&
    (s.name + s.id + s.email + s.course).toLowerCase().includes(query.toLowerCase()));
  const count = (st) => students.filter((s) => s.status === st).length;

  return (
    <div className="app">
      <div className="aurora" />
      <header>
        <div><p className="eyebrow">Limkokwing University · Lesotho</p><h1>Student<span></span></h1><p className="muted">Manage every student record in one beautiful place.</p></div>
        <button className="primary big" onClick={() => setModal({ type: "form", student: null })}>+ Add student</button>
      </header>
      <section className="stats">
        <div className="card"><b>{students.length}</b><span>Total students</span></div>
        <div className="card"><b>{count("Active")}</b><span>Active</span></div>
        <div className="card"><b>{count("Graduated")}</b><span>Graduated</span></div>
        <div className="card"><b>{students.filter((s) => s.scholarship).length}</b><span>Scholarships</span></div>
      </section>
      <section className="panel">
        <div className="tools">
          <input placeholder="🔍  Search name, ID, email, course…" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>{["All", ...STATUSES].map((s) => <option key={s}>{s}</option>)}</select>
        </div>
        <StudentList students={visible} onEdit={(s) => setModal({ type: "form", student: s })} onDelete={(s) => setModal({ type: "delete", student: s })} />
      </section>
      {modal?.type === "form" && <StudentModal student={modal.student} students={students} onSave={save} onClose={() => setModal(null)} />}
      {modal?.type === "delete" && <DeleteModal student={modal.student} onConfirm={() => { deleteStudent(modal.student.id); setModal(null); }} onClose={() => setModal(null)} />}
    </div>
  );
}
