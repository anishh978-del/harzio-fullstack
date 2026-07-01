const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const SECRET = "mysecretkey"; // keep simple for now

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ email, password: hashedPassword });
  await user.save();

  res.json({ message: "User registered" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });

  res.json({ token });
});

module.exports = router;
// FIREBASE LOGIN BRIDGE
router.post("/firebase-login", async(req,res)=>{

  const {email} = req.body;


  let user = await User.findOne({email});


  // if google/phone user first time
  if(!user){

    user = new User({
      email,
      password:"firebase"
    });

    await user.save();

  }


  const token = jwt.sign(
    {id:user._id},
    SECRET,
    {expiresIn:"1h"}
  );


  res.json({
    token
  });

});