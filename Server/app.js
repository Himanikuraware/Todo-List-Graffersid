const express = require("express");
const cors = require("cors");

const todoRoutes = require("./routes/todo");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use(todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
