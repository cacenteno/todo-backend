//Core Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
//Controllers (routers) 
const routes = require("./controllers/User.js")
const todoRoutes = require("./controllers/ToDo.js")

//Socket.io Imports 
const server = require('http').Server(app);
var io = require('./lib/socket.js').listen(server)
server.listen(2000)
//Use BodyParsers
//Socket.io
//
//Socket.io
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Use Cors
app.use(cors());
app.use(express.static("public"))
//Use .env files
require("dotenv").config();
//connect to mongo
var connect = mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
}, console.log("Connected to db"));
//Roots to routes
app.use("/api/", routes);
app.use("/api/todos", todoRoutes)
//Catch all errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: {
    message: err.message} });
});
//Start http server
app.listen(3000, () => { console.log("Started") })
