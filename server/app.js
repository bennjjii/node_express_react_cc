var userData = require("./data/users.json");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var app = express();

const options = {
  origin: "http://localhost:5000",
};
app.use(cors(options));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//define routes here
app.use(express.static(path.resolve(__dirname, "./../client/build")));

console.log(userData);
app.get("/users", (req, res) => {
  res.json(userData);
});

app.get("/users/:id", (req, res) => {
  res.json(userData.find((user) => user.id == req.params.id));
});

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./../client/build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
