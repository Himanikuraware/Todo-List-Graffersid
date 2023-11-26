const express = require("express");

const todoControllers = require("../controllers/todo");

const router = express.Router();

router.get("/tasks", todoControllers.getTodos);

router.post("/tasks", todoControllers.addTodo);

router.put("/tasks/:id", todoControllers.updateTodo);

router.delete("/tasks/:id", todoControllers.deleteTodo);

module.exports = router;
