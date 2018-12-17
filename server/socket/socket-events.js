const {
  registerUser,
  requestRandomChat,
  createMessage
} = require("./socket-event-handlers");

exports = module.exports = function(io) {
  // Add socket.io listeners
  io.on("connection", socket => {
    console.log("a user connected", socket.id);

    socket.on("register user", registerUser(socket));

    socket.on("request random chat", requestRandomChat(socket));

    socket.on("new message", createMessage(io));

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
};
