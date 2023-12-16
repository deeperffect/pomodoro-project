import React, { useState, useEffect } from 'react';
import Task from '../components/Task';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const addTask = async (newTask) => {
    try {
      let apiUrl = 'http://localhost:5000/tasks';
  
      // If editingTask is not null, it's an edit operation
      if (editingTask !== null) {
        apiUrl += `/${editingTask._id}`;
      } else {
        apiUrl += `/create`;
      }
  
      // Perform API call to save the task in the database
      const response = await fetch(apiUrl, {
        method: editingTask !== null ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(newTask),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save the task in the database');
      }
  
      const savedTask = await response.json();
  
      // If editingTask is not null, update the existing task
      if (editingTask !== null) {
        const updatedTasks = tasks.map((task) =>
          task._id === editingTask._id ? savedTask : task
        );
        setTasks(updatedTasks);
        setEditingTask(null);
      } else {
        // Otherwise, add the new task to the state
        setTasks([...tasks, savedTask]);
      }
  
      setShowTaskForm(false); // Hide the Task form after submitting
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  

  const editTask = (task) => {
    // Set the task to be edited, and show the Task form
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const deleteTask = async (taskId) => {
    try {
      // Perform API call to delete the task from the database
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the task from the database');
      }

      // Update the state by removing the deleted task
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    // Fetch existing tasks from the database when the component mounts
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks/all');
        if (response.ok) {
          const fetchedTasks = await response.json();
          setTasks(fetchedTasks);
        } else {
          throw new Error('Failed to fetch tasks from the database');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchTasks();
  }, []); // Run this effect only once when the component mounts

  return (
    <div>
      {/* Create Task Button */}
      <button onClick={() => setShowTaskForm(true)}>Create Task</button>

      {/* Display Task Form */}
      {showTaskForm && <Task onSubmit={addTask} editingTask={editingTask} />}

      {/* Display Tasks */}
      <div>
        {tasks.length === 0 ? (
          <p>No tasks yet. Create one!</p>
        ) : (
          tasks.map((task, index) => (
            <div key={index}>
              {/* Display specific properties of the task object */}
              <p>Title: {task.title}</p>
              <p>Description: {task.description}</p>
              <p>Due Date: {task.dueDate}</p>

              {/* Edit and Delete Buttons */}
              <button onClick={() => editTask(task)}>Edit</button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;
