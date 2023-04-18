const path = require("path");
const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
app.use(cors());
//Import Routes
const homeRoute = require("./routes/home");
const moviesRoute = require("./routes/movies");
const searchRoute = require("./routes/search");
const listRoute = require("./routes/list");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoute);
app.use("/search", searchRoute);
app.use("/movies", moviesRoute);
app.use("/list", listRoute);

//local error handler
app.use((req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: err.message },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log("ERROR: ", errorObj.log);
  const errorStatus = errorObj.status || 500;
  return res.status(errorStatus).send(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
