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
  
  const postTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/post/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({ taskId }),
      });

      if (!response.ok) {
        throw new Error('Failed to post the task');
      }

      await response.json();
      alert('Task posted successfully');
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
    if (currentUser) {
    
      const fetchTasks = async () => {
        try {
        const response = await fetch('http://localhost:5000/tasks/all', {
          headers: {
            'Authorization': `Bearer ${currentUser.token}`,
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
  }
  }, [currentUser]);
  
  return (
    <div>
      <div className="grid button-grid shell-grid">
        <button className="button" onClick={() => setShowTaskForm(true)}>Create Task</button>
      </div>

      {showTaskForm && <Task onSubmit={addTask} editingTask={editingTask} />}

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
                <button className="button" onClick={() => postTask(task._id)}>Post Task</button>
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
