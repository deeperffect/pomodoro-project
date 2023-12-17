const router = require("express").Router();
const Task = require('../models/Task');
const authMiddleware = require('../middlewares/authMiddleware');
const PublicTask = require("../models/PublicTask");

router.post('/:taskId/post', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const originalTask = await Task.findById(taskId);

    if (!originalTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const newTask = new PublicTask({
      title: originalTask.title,
      description: originalTask.description,
      dueDate: originalTask.dueDate,
    });

    const savedTask = await newTask.save();

    res.json(savedTask);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/create', authMiddleware.auth, async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.user._id;
    const payload = { title, description, dueDate, owner: userId };
    const createdTask = await Task.create(payload);
    res.status(201).json(createdTask);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/all', authMiddleware.isAuth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.userId });
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

    const result = await Task.findByIdAndDelete(taskId);

    if (!result) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;