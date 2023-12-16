const router = require("express").Router();
const userController = require("./controllers/userController");
const taskController = require("./controllers/taskController");
const projectController = require("./controllers/projectController");

router.use('/users', userController);
router.use('/tasks', taskController);
// router.use('/study-projects', projectController);

module.exports = router;