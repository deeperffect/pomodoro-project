import React, { useState, useEffect } from 'react';
import '../styles/task.css';

const Task = ({ onSubmit, editingTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Use useEffect to set initial form values when editingTask changes
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setDueDate(editingTask.dueDate || '');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a task object with the form values
    const newTask = {
      title,
      description,
      dueDate,
    };

    // Pass the new task object to the parent component for handling
    onSubmit(newTask);

    // Reset form fields
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  
  return (
    <div className="tasks-container">
      <form className="tasks-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        {editingTask ? (
          <button type="submit">Update Task</button>
        ) : (
          <button type="submit">Create Task</button>
        )}
      </form>
    </div>
  );
};

export default Task;
