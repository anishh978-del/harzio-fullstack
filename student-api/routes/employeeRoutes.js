const express = require("express");
const router = express.Router();

const Employee = require("../models/Employee");


// CREATE
router.post("/", async (req, res) => {
  console.log("REQ BODY:", req.body);
  console.log("🔥 POST HIT");
  console.log("BODY:", req.body);

  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id",  async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;