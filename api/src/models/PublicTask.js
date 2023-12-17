const mongoose = require('mongoose');
const publicTaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: String,
  originalId: {
    type: mongoose.Types.ObjectId,
    ref: 'Task',
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});
const PublicTask = mongoose.model('PublicTask', publicTaskSchema);
module.exports = PublicTask;