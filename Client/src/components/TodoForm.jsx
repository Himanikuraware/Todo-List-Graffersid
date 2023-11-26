import React, { useState } from "react";
import classes from "./Todo.module.css";

const TodoForm = ({ onAddTask, API_ENDPOINT }) => {
  const [newTask, setNewTask] = useState("");

  const handleAddTodo = async () => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: newTask }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const data = await response.json();
      onAddTask(data);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const isAddButtonDisabled = newTask.trim() === "";

  return (
    <div>
      <input
        className={classes.inputField}
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button
        className={classes.addButton}
        onClick={handleAddTodo}
        disabled={isAddButtonDisabled}
      >
        Add Todo
      </button>
    </div>
  );
};

export default TodoForm;
