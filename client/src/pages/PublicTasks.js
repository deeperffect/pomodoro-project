import React, { useState, useEffect } from 'react';
import { useUser } from '../components/UserContext';

const PublicTasks = () => {
  const [publicTasks, setPublicTasks] = useState([]);
  const { currentUser } = useUser();

  useEffect(() => {
    const fetchPublicTasks = async () => {
      try {
        if (!currentUser || !currentUser.userId) {
          return;
        }

        const response = await fetch(`http://localhost:5000/public-tasks?userId=${currentUser.userId}`);
        if (response.ok) {
          const fetchedTasks = await response.json();
          const filteredTasks = fetchedTasks.filter(task => task.postedBy !== currentUser.userId);
          setPublicTasks(filteredTasks);
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
    // Implement the logic for what happens when a user clicks "Get Task"
    console.log(`User wants to get task with ID: ${taskId}`);
    // You can perform additional actions, such as updating the task status, showing details, etc.
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
              <button onClick={() => handleGetTask(task._id)}>Get Task</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PublicTasks;
