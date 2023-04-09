const path = require("path");
const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
require("dotenv").config();

//Import Routes
const moviesRoute = require("./routes/movies");
const searchRoute = require("./routes/search");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/search", searchRoute);
app.use("/movies", moviesRoute);

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
