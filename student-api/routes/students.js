const express = require("express");
const router = express.Router();

// Dummy data (replace with MongoDB later if needed)
let students = [];

// GET all students
router.get("/", (req, res) => {
  res.json(students);
});

// ADD student
router.post("/", (req, res) => {
  const student = {
    id: Date.now(),
    ...req.body,
  };

  students.push(student);
  res.json(student);
});

// DELETE student
router.delete("/:id", (req, res) => {
  students = students.filter(s => s.id != req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;