const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  public: Boolean,
  tasks: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Task'
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }
});
const Project = mongoose.model('Project', projectSchema);
module.exports = Project;