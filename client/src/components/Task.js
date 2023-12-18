import React, { useState, useEffect } from 'react';
import '../styles/task.css';

const Task = ({ onSubmit, editingTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [publicTask, setPublicTask] = useState(false);


  useEffect(() => {
    if (editingTask) {
      console.log(editingTask)
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setDueDate(editingTask.dueDate || '');
      setPublicTask(editingTask.publicTask || false);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      dueDate,
      publicTask,
    };

    onSubmit(newTask);

    setTitle('');
    setDescription('');
    setDueDate('');   
  };

  return (
    <div className="tasks-container">
      <div className="form form-space">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-row">
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          {editingTask ? (
            <button className="button" type="submit">Update Task</button>
          ) : (
            <button className="button" type="submit">Create Task</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Task;
