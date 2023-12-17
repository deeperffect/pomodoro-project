import React, { useState, useEffect } from 'react';

const PublicTasks = () => {
  const [publicTasks, setPublicTasks] = useState([]);

  useEffect(() => {
    const fetchPublicTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/public-tasks'); // Replace with your actual endpoint
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
  }, []);

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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PublicTasks;
