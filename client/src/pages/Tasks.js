import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import "../styles/tasks.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');

  // useEffect(() => {
  //   // Fetch tasks when the component mounts
  //   fetchTasks();
  // }, []);

  // const fetchTasks = async () => {
  //   try {
  //     const response = await fetch('/tasks');
  //     const data = await response.json();
  //     setTasks(data);
  //   } catch (error) {
  //     console.error('Error fetching tasks:', error);
  //   }
  // };

  const addTask = async () => {
    try {
      const response = await fetch('http://localhost:3030/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: taskTitle, description: taskDescription, dueDate: taskDueDate }),
      });
      const data = await response.json();
      setTasks([...tasks, data]);
      setTaskTitle('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Rest of the component remains the same...

  return (
    <div>
      <h1>Tasks Page</h1>
      <div>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
         <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
         <input
          type="text"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      {/* <TaskList
        tasks={tasks}
        onEdit={editTask}
        onComplete={completeTask}
        onDelete={deleteTask}
      /> */}
    </div>
  );
};

export default Tasks;
