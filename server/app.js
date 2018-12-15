var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var uuid = require("uuid");
var moment = require("moment");

app.get("/", function(req, res) {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", function(socket) {
  console.log("a user connected");

  socket.on("chat message", function(message) {
    console.log("chat message sent: ", message);
    io.emit("chat message", {
      ...message,
      id: uuid(),
      time: moment().format()
    });
  });
});

io.on("disconnect", function() {
  console.log("user disconnected");
});

http.listen(3001, function() {
  console.log("listening on *:3001");
});
