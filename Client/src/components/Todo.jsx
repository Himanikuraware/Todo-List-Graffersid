import React, { useState, useEffect } from "react";
import classes from "./Todo.module.css";
import TodoForm from "./TodoForm";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const API_ENDPOINT = "http://localhost:8000/tasks";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((data) => setTasks(data));
  };

  const handleEditTask = (taskId) => {
    setEditingTask(taskId);
    const taskToEdit = tasks?.find((task) => task.id === taskId);
    setEditedTask(taskToEdit.task);
  };

  const handleUpdateTask = (taskId) => {
    fetch(`${API_ENDPOINT}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: editedTask }),
    }).then(() => {
      const updatedTasks = tasks?.map((task) =>
        task?.id === taskId ? { ...task, task: editedTask } : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
      setEditedTask("");
    });
  };

  const handleDeleteTask = (taskId) => {
    fetch(`${API_ENDPOINT}/${taskId}`, {
      method: "DELETE",
    }).then(() => setTasks(tasks?.filter((task) => task.id !== taskId)));
  };

  const handleAddTodo = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className={classes.todo}>
      <h1>My Todos</h1>
      <TodoForm onAddTask={handleAddTodo} API_ENDPOINT={API_ENDPOINT} />
      <ul>
        {tasks?.map((task) => (
          <li key={task.id} className={classes.taskItem}>
            {editingTask === task?.id ? (
              <div>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button
                  onClick={() => handleUpdateTask(task?.id)}
                  disabled={!editedTask.trim()}
                >
                  Update
                </button>
              </div>
            ) : (
              <div className={classes.taskContainer}>
                <span>{task?.task}</span>
                <button onClick={() => handleEditTask(task?.id)}>Edit</button>
                <button onClick={() => handleDeleteTask(task?.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
