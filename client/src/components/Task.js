import React from 'react';
import "../styles/task.css";

const Task = ({ task, onEdit, onComplete, onDelete }) => {
  return (
    <div>
      <span>{task.title}</span>
      <span>{task.description}</span>
      <span>{task.dueDate}</span>
      <button onClick={() => onEdit(task.id)}>Edit</button>
      <button onClick={() => onComplete(task.id)}>Complete</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default Task;