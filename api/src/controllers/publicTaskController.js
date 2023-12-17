const router = require("express").Router();
const Task = require('../models/Task');
const authMiddleware = require('../middlewares/authMiddleware');
const PublicTask = require("../models/PublicTask");


router.get('/', async (req, res) => {
  try {
    const publicTasks = await PublicTask.find();
    res.json(publicTasks);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;  