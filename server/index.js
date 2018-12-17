const express = require("express");
const app = express();
// var http = require("http").Server(app);
// var io = require("socket.io")(http);
// var uuid = require("uuid");
// var moment = require("moment");
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

// io.on("connection", function(socket) {
//   console.log("a user connected", socket.id);

//   socket.on("chat message", function(message) {
//     console.log("chat message sent: ", message);
//     io.emit("chat message", {
//       ...message,
//       id: uuid(),
//       time: moment().format()
//     });
//   });

//   socket.on("disconnect", function() {
//     console.log("user disconnected", socket.id);
//   });
// });
