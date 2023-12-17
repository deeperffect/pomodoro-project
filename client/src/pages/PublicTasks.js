import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';

const PublicTasks = () => {
  const [publicTasks, setPublicTasks] = useState([]);
  const { currentUser } = useContext(UserContext);

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

        const task = await response.json();
        console.log(task);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    getTask();
  };

  if (!currentUser) {
    return <p>Loading...</p>; // or another loading state
  }

  return (
    <div>
      <h2>Public Tasks</h2>

      {publicTasks.length === 0 ? (
        <p>No public tasks available.</p>
      ) : (
        <ul>
          {publicTasks.map((task) => (
            <li key={task._id}>
              <p>Title: {task.title}</p>
              <p>Description: {task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              {task.owner !== currentUser.userId &&
              <button onClick={() => handleGetTask(task._id)}>Get Task</button>
              }
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PublicTasks;
