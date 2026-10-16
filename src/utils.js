// ---- Constants: const because they are never reassigned (arrays/objects can still be read safely)
export const COURSES = ["Software Engineering","Business IT","Business Management","Civil Engineering","Tourism Management","Business Intelligence","Fashion Design","Architecture"];
export const STATUSES = ["Active","Deferred","Graduated"];
export const STORAGE_KEY = "sms-students";

// Student record = object: string (id,name,email,course,status), number (age), boolean (scholarship)
export const SEED = [
  { id:"STU-001", name:"Palesa Mokoena", age:20, email:"palesa@limkokwing.ac.ls", course:"Software Engineering", status:"Active", scholarship:true },
  { id:"STU-002", name:"Thabo Letsie", age:22, email:"thabo@limkokwing.ac.ls", course:"Networking", status:"Active", scholarship:false },
  { id:"STU-003", name:"Lineo Ramohapi", age:19, email:"lineo@limkokwing.ac.ls", course:"Multimedia Design", status:"Deferred", scholarship:false },
  {id:"STU-004", name: "Bohang Ntobo", age:23, email: "bohang@limkokwing.ac.ls", course: "Architecture", status: "Active", scholarship: true},
  {id:"STU-005", name: "Karabelo Tshoeu", age:20, email: "karabelo@limkokwing.ac.ls", course: "Business Management", status: "Active", scholarship: "true"},
  {id:"STU-006", name: "Lerato Mosa", age: 21, email: "leratolimkokwing.ac.ls", course: "Fashion Design", status: "Graduated", scholarship: false}
];

export function nextId(students) {
  var highest = 0;
  students.forEach((s) => { let n = parseInt(s.id.split("-")[1], 10); if (n > highest) highest = n; });
  return "STU-" + String(highest + 1).padStart(3, "0");
}

export function validate(form, students, editingId) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Full name is required.";
  else if (form.name.trim().length < 3) errors.name = "Name must be at least 3 characters.";
  const age = Number(form.age); // inputs give strings, so convert to number
  if (form.age === "") errors.age = "Age is required.";
  else if (!Number.isInteger(age) || age < 15 || age > 80) errors.age = "Enter a whole age between 15 and 80.";
  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
  else if (students.some((s) => s.email.toLowerCase() === form.email.toLowerCase() && s.id !== editingId)) errors.email = "This email is already registered.";
  if (!form.course) errors.course = "Please choose a course.";
  return errors;
}

export const loadStudents = () => {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : SEED; }
  catch { return SEED; }
};
