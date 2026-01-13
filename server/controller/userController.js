const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) return res.status(400).send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      message: "User created successfully",
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) return res.status(400).send("Cannot find user");

    const match = await bcrypt.compare(password, user.password);
    if (match) return res.send("Login successful");

    res.status(401).send("Incorrect password");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
