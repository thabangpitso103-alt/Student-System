const initials = (name) => name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

export default function StudentList({ students, onEdit, onDelete }) {
  if (students.length === 0) return <div className="empty">🎓<h3>No students found</h3><p className="muted">Add a student or adjust your search.</p></div>;
  return (
    <table className="list">
      <thead><tr><th>Student</th><th>Age</th><th>Course</th><th>Status</th><th></th></tr></thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id}>
            <td data-label="Student"><div className="who"><span className="avatar">{initials(s.name)}</span><div><b>{s.name}</b><div className="muted">{s.id} · {s.email}</div></div></div></td>
            <td data-label="Age">{s.age}</td>
            <td data-label="Course">{s.course}{s.scholarship && <span className="star" title="Scholarship"> ★</span>}</td>
            <td data-label="Status"><span className={"badge " + s.status}>{s.status}</span></td>
            <td className="btns"><button className="ghost sm" onClick={() => onEdit(s)}>Edit</button><button className="danger sm" onClick={() => onDelete(s)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
