const express = require("express");
const router = new express.Router();
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// - id (number): Unique identifier for the task
// - title (string): Title of the task
// - completed (boolean): Indicates whether the task is completed

const tasks = [];
let taskIdCount = 0;

const createTask = (title, completed) => {
  taskIdCount++;
  id = taskIdCount;
  return { id, title, completed };
};

// GET /tasks - Retrieve all tasks
router.get("/tasks", (req, res) => {
  res.status(201).send(tasks);
});

// POST /tasks - Create a new task
router.post("/tasks", (req, res) => {
  const { title, completed } = req.body;
  const newTask = createTask(title, completed);
  tasks.push(newTask);
  res.status(201).send(newTask);
});

// PUT /tasks/:id - Update an existing task by ID
router.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const index = tasks.findIndex((x) => x.id == id);

  let taskToUpdate = {};
  if (index >= 0) {
    taskToUpdate = tasks[index];
    taskToUpdate.title = title;
    taskToUpdate.completed = completed;
  } else {
    return res.status(400).send({ error: "Task not exists" });
  }

  res.status(201).send(taskToUpdate);
});

// DELETE /tasks/:id - Delete a task by ID
router.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((x) => x.id == id);

  if (index >= 0) {
    tasks.splice(index, 1);
  } else {
    return res.status(400).send({ error: "Task not exists" });
  }

  res.status(201).send({ message: true });
});

app.use(router);

app.listen(3030, () => {
  console.log("Server is up on port " + 3030);
});

module.exports = app;
