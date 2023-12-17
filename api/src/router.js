const router = require("express").Router();
const userController = require("./controllers/userController");
const taskController = require("./controllers/taskController");
const publicTaskController = require("./controllers/publicTaskController");

router.use('/users', userController);
router.use('/tasks', taskController);
router.use('/public-tasks', publicTaskController);


module.exports = router;