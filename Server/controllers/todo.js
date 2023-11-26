const fs = require("fs");

const saveTodosToFile = () => {
  fs.writeFileSync("todos.json", JSON.stringify(todos), "utf-8");
};

const readTasksFromFile = () => {
  try {
    const fileContent = fs.readFileSync("todos.json", "utf-8");
    return JSON.parse(fileContent);
  } catch (err) {
    console.log(err);
    return [];
  }
};

let todos = readTasksFromFile();

const getTodos = (req, res) => {
  res.json(todos);
};

const addTodo = (req, res) => {
  const { task } = req.body;
  const newTask = { id: todos.length + 1, task };
  todos.push(newTask);
  saveTodosToFile();
  res.json(newTask);
};

const updateTodo = (req, res) => {
  const taskId = parseInt(req.params.id);
  const { task } = req.body;
  todos = todos.map((t) => (t.id === taskId ? { ...t, task: task } : t));
  saveTodosToFile();
  res.send("Task updated successfully");
};

const deleteTodo = (req, res) => {
  const taskId = parseInt(req.params.id);
  todos = todos.filter((task) => task.id !== taskId);
  saveTodosToFile();
  res.send("Task deleted successfully");
};

exports.getTodos = getTodos;
exports.addTodo = addTodo;
exports.deleteTodo = deleteTodo;
exports.updateTodo = updateTodo;
