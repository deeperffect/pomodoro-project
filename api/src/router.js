const router = require("express").Router();
const userController = require("./controllers/userController");
const taskController = require("./controllers/taskController");

router.use('/users', userController);
router.use('/tasks', taskController);


module.exports = router;