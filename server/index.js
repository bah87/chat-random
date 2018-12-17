const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config");
const socketEvents = require("./socket/socket-events");

mongoose.connect(config.database).catch(function(reason) {
  console.log("Unable to connect to the mongodb instance. Error: ", reason);
});

const server = app.listen(config.port, function() {
  console.log("listening on *:3001");
});

const io = require("socket.io").listen(server);
socketEvents(io);
