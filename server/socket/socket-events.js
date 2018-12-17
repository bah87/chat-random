const {
  registerUser,
  requestRandomChat,
  createMessage,
  socketEvents
} = require("./socket-event-handlers");

exports = module.exports = function(io) {
  // Add socket.io listeners
  io.on("connection", socket => {
    console.log("a user connected", socket.id);

    socket.on(socketEvents.REGISTER_USER, registerUser(socket));

    socket.on(socketEvents.REQUEST_RANDOM_CHAT, requestRandomChat(socket, io));

    socket.on(socketEvents.NEW_MESSAGE, createMessage(io));

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
};
