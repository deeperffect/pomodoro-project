import React, { useState, useEffect } from 'react';
import Task from '../components/Task';
import { onAuthError } from '../helpers/authentication';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const postTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}/post`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to post the task');
      }

      const postedTask = await response.json();
      console.log('Task posted successfully:', postedTask);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  const addTask = async (newTask) => {
    try {
      let apiUrl = 'http://localhost:5000/tasks';
  
      if (editingTask !== null) {
        apiUrl += `/${editingTask._id}`;
      } else {
        apiUrl += `/create`;
      }
  
      const response = await fetch(apiUrl, {
        method: editingTask !== null ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newTask),
      });
  
      if (!response.ok) {
        
        throw new Error('Failed to save the task in the database');
      }
  
      const savedTask = await response.json();
  
      if (editingTask !== null) {
        const updatedTasks = tasks.map((task) =>
          task._id === editingTask._id ? savedTask : task
        );
        setTasks(updatedTasks);
        setEditingTask(null);
      } else {
        setTasks([...tasks, savedTask]);
      }
  
      setShowTaskForm(false); 
    } catch (error) {
      onAuthError(error);
    }
  };
  

  const editTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the task from the database');
      }

      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks/all', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if(response.status === 200) {
          const fetchedTasks = await response.json();
          setTasks(fetchedTasks);
        }
        if(response.status === 401) {
          onAuthError();
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <button onClick={() => setShowTaskForm(true)}>Create Task</button>

      {showTaskForm && <Task onSubmit={addTask} editingTask={editingTask} />}

      <div>
        {tasks.length === 0 ? (
          <p>No tasks yet. Create one!</p>
        ) : (
          tasks.map((task, index) => (
            <div key={index}>
              <p>Title: {task.title}</p>
              <p>Description: {task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              
              <button onClick={() => editTask(task)}>Edit</button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
              <button onClick={() => postTask(task._id)}>Post Task</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;
