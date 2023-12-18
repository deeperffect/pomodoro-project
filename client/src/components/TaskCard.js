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
        {/* <button className="button" onClick={() => editTask(task)}>Edit</button>
        <button className="button" onClick={() => deleteTask(task._id)}>Delete</button>
        <button className="button" onClick={() => postTask(task._id)}>Post Task</button> */}
      </div>
    </div>
    );
}

export default TaskCard;