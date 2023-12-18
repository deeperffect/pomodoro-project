const TaskCard = ({task, children}) => {
  return (

    <div className="task">
      <div className="task-content">
        <h2>Title: {task.title}</h2>
        <p>Description: {task.description}</p>
        <p>Due Date: {task.dueDate}</p>
      </div>
            
      <div className="task-controls">
        {children}
      </div>
    </div>
    );
}

export default TaskCard;