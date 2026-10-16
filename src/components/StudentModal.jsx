
import { useState, useEffect } from "react";
import { COURSES, STATUSES, validate } from "../utils.js";

function Field({ label, name, errors, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
      {errors[name] && (
        <small role="alert">{errors[name]}</small>
      )}
    </label>
  );
}

export default function StudentModal({
  student,
  students,
  onSave,
  onClose,
}) {
  const [form, setForm] = useState(() => student ?? {
    name: "",
    age: "",
    email: "",
    course: "",
    status: "Active",
    scholarship: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const change = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    const found = validate(form, students, student?.id);
    setErrors(found);

    if (Object.keys(found).length === 0) {
      onSave({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        age: Number(form.age),
      });
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <form
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        noValidate
      >
        <h2>{student ? "Edit student" : "Add new student"}</h2>

        <Field label="Full name" name="name" errors={errors}>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={change}
            autoFocus
          />
        </Field>

        <div className="row">
          <Field label="Age" name="age" errors={errors}>
            <input
              name="age"
              type="number"
              value={form.age}
              onChange={change}
            />
          </Field>

          <Field label="Status" name="status" errors={errors}>
            <select
              name="status"
              value={form.status}
              onChange={change}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Email" name="email" errors={errors}>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={change}
            autoComplete="email"
          />
        </Field>

        <Field label="Course of study" name="course" errors={errors}>
          <select
            name="course"
            value={form.course}
            onChange={change}
          >
            <option value="">Select course…</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <label className="check">
          <input
            type="checkbox"
            name="scholarship"
            checked={form.scholarship}
            onChange={change}
          />
          Scholarship recipient
        </label>

        <div className="actions">
          <button
            type="button"
            className="ghost"
            onClick={onClose}
          >
            Cancel
          </button>

          <button type="submit" className="primary">
            {student ? "Save changes" : "Add student"}
          </button>
        </div>
      </form>
    </div>
  );
}
