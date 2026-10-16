# Studently – Student Management System (DIWA2110)
React + Vite app to view, add, edit and delete student records using modals. Data persists in `localStorage`.

## Run
```
npm install
npm run dev        # development
npm run build && npm start   # production build served by server.js
```
Deploy: import the GitHub repo in Netlify/Vercel (build: `npm run build`, output: `dist`).

## Design choices
- **const** for constants/state setters/functions never reassigned; **let** for loop-scoped values that change; **var** in `nextId()` to demonstrate function scope.
- Student = object with strings (id, name, email, course, status), number (age), boolean (scholarship); list = array.
- Array methods: `map`, `filter`, `some`, `forEach`. Components: App, StudentList, StudentModal, DeleteModal.

## Testing checklist (tick after testing)
- [ ] Add valid student  - [ ] Edit student  - [ ] Delete + cancel delete
- [ ] Validation: empty fields, bad email, age 5 / 200, duplicate email
- [ ] Empty state (delete all / search nonsense)  - [ ] Mobile layout  - [ ] Refresh keeps data
