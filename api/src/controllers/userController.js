const router = require("express").Router();
const userService = require('../services/userService');


router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, repeatPassword } = req.body;
  try {
    const token = await userService.register({ firstName, lastName, email, password, repeatPassword });
    res.status(201).json({token});
  } catch (error) {
    res.status(404).json('registration failed');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    token = await userService.login(email, password);
    //res.status(200).cookie('token', token, { httpOnly: true });
    res.status(200).json({token, success: true});
  } catch (error) {
    res.status(404).json('login failed');
  }
});

module.exports = router;