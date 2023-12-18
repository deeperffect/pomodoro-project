import React, { useState, useEffect, useContext } from 'react';
import Task from '../components/Task';
import { onAuthError } from '../helpers/authentication';
import { UserContext } from '../components/UserContext';
import TaskCard from '../components/TaskCard';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { currentUser } = useContext(UserContext);

  // Function to update the status of a task
  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/post/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update the task status');
      }

      alert(`Task ${status === 'posted' ? 'posted' : 'updated'} successfully`);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // Function to add or edit a task
  const saveTask = async (newTask) => {
    try {
      const apiUrl = editingTask !== null
        ? `http://localhost:5000/tasks/${editingTask._id}`
        : 'http://localhost:5000/tasks/create';

      const method = editingTask !== null ? 'PUT' : 'POST';

      const response = await fetch(apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
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

  // Function to edit a task
  const editTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  // Function to delete a task
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

  // Fetch tasks on component mount or when the user changes
  useEffect(() => {
    if (currentUser) {
      const fetchTasks = async () => {
        try {
          const response = await fetch('http://localhost:5000/tasks/all', {
            headers: {
              'Authorization': `Bearer ${currentUser.token}`,
            },
          });

          if (response.status === 200) {
            const fetchedTasks = await response.json();
            setTasks(fetchedTasks);
          }

          if (response.status === 401) {
            onAuthError();
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      };

      fetchTasks();
    }
  }, [currentUser]);

  return (
    <div>
      <div className="page-name">
        <h1>Tasks</h1>
      </div>
      <div className="grid button-grid shell-grid">
        <button className="button" onClick={() => setShowTaskForm(true)}>Create Task</button>
      </div>

      {showTaskForm && <Task onSubmit={saveTask} editingTask={editingTask} />}

      <div>
        {tasks.length === 0 ? (
          <p>No tasks yet. Create one!</p>
        ) : (
          <div className="grid shell-grid">
            {tasks.map((task) => (
              <TaskCard task={task} key={task._id}>
                <>
                  <button className="button" onClick={() => editTask(task)}>Edit</button>
                  <button className="button" onClick={() => deleteTask(task._id)}>Delete</button>
                  <button className="button" onClick={() => updateTaskStatus(task._id, 'posted')}>Post Task</button>
                </>
              </TaskCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
