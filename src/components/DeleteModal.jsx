export default function DeleteModal({ student, onConfirm, onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="alertdialog">
        <h2>Delete student?</h2>
        <p className="muted"><b>{student.name}</b> ({student.id}) will be permanently removed.</p>
        <div className="actions"><button className="ghost" onClick={onClose}>Cancel</button><button className="danger" onClick={onConfirm}>Yes, delete</button></div>
      </div>
    </div>
  );
}
