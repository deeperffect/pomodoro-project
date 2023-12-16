const router = require("express").Router();
const userService = require('../services/userService');
const User = require('../models/User');


router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, repeatPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json('Email is already in use');
    }

    const token = await userService.register({ firstName, lastName, email, password, repeatPassword });
    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json('Registration failed');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    token = await userService.login(email, password);
    res.status(200).json({token, success: true});
  } catch (error) {
    res.status(404).json('login failed');
  }
});

module.exports = router;