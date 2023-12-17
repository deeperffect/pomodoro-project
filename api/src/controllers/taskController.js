const router = require("express").Router();
const Task = require('../models/Task');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/get/:id', authMiddleware.isAuth, async (req, res) => {
  try {
    const taskId = req.params.id;
    const ownerId = req.userId;
    const task = await Task.findById(taskId);
    const { title, description, dueDate, owner } = task;

    const newTask = new Task({
      title: title,
      description: description,
      dueDate: dueDate,
      owner: ownerId });
    await newTask.save();
    res.status(200).json({message: 'success'});

  }catch(error) {
    console.log(error);
  }
});

router.get('/public-tasks', async (req, res) => {
  try {
    const publicTasks = await Task.find({ public: true });
    res.json(publicTasks);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/create', authMiddleware.auth, async (req, res) => {
  try {
    const { title, description, dueDate, public } = req.body;
    const userId = req.user._id;
    const payload = { title, description, dueDate, public, owner: userId };
    const createdTask = await Task.create(payload);
    res.status(201).json(createdTask);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.patch('/post/:id', authMiddleware.auth, async (req, res) => {
  try{
    const taskId = req.params.id;
    await Task.findByIdAndUpdate(taskId, { public: true });
    res.status(200);
  }catch(error){
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