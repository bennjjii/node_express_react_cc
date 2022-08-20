import { Request, Response, NextFunction } from "express";
import { User } from "./types";

var userData: User[] = require("./data/users.json");

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

app.get("/users", (req: Request, res: Response) => {
  const mockDelay = setTimeout(() => {
    clearTimeout(mockDelay);
    res.json(userData);
  }, 1000);
});

app.get("/users/:id", (req: Request, res: Response) => {
  const mockDelay = setTimeout(() => {
    clearTimeout(mockDelay);
    res.json(userData.find((user) => user.id == +req.params.id));
  }, 1000);
});

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "./../client/build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
