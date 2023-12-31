const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: String,
  public: Boolean,
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;