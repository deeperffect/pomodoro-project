const router = require("express").Router();
const Task = require('../models/Task');
const User = require('../models/User');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/create', async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const user = await User.findById(req.user._id);
    const userId = user._id;
    const payload = { title, description, dueDate, owner: userId };
    const createdTask = await Task.create(payload);
    res.status(201).json(createdTask);
    console.log(userId);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/all', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const updatedTask = req.body;

    // Find the task by ID and update it
    const result = await Task.findByIdAndUpdate(taskId, updatedTask, { new: true });

    if (!result) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.delete('/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;

    // Find the task by ID and remove it
    const result = await Task.findByIdAndDelete(taskId);

    if (!result) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).end(); // No content (successful deletion)
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;