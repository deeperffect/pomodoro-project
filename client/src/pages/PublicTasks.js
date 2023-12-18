import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';

const PublicTasks = () => {
  const [publicTasks, setPublicTasks] = useState([]);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublicTasks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tasks/public-tasks`);
        if (response.ok) {
          const fetchedTasks = await response.json();
          setPublicTasks(fetchedTasks);
        } else {
          console.error('Failed to fetch public tasks:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchPublicTasks();
  }, [currentUser]);

  const handleGetTask = (taskId) => {
    if (!currentUser || !currentUser.token) {
      navigate('/users/login');
      return;
    }

    const getTask = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tasks/get/${taskId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentUser.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to get task');
        }

        await response.json();
        if(response.ok){
          alert("Task successfully added to your tasks list.");
        }
          
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    getTask();
  };

  return (
    <div className="page-name">
      <h1>Public Tasks</h1>

      {publicTasks.length === 0 ? (
        <p>No public tasks available.</p>
      ) : (
        <div className="grid shell-grid">
          {publicTasks.map((task) => (
            <TaskCard task={task} key={task._id}>
              {task.owner !== currentUser?.userId && (
              <button className="button" onClick={() => handleGetTask(task._id)}>Get Task</button>
              )}
            </TaskCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicTasks;
