// Express to run server and routes.
const express = require("express");
// Start up an instance of app.
const app = express();
/*Dependencies*/
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance.
const cors = require("cors");
app.use(cors());
// Initialize the main project folder.
app.use(express.static("website"));
const port = 8000;
// Spin up the server.
const server = app.listen(port, () => {
  console.log(`Server is running on:http://localhost:${port}`);
});
// Setup empty JS object to act as endpoint for all routes.
projectData = {};
//Get request.
app.get(
  "/all",

  (req, res) => {
    res.send(projectData);
  }
);
//Post request.
app.post("/post", (req, res) => {
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    content: req.body.content,
  };
  res.send(projectData);
});
