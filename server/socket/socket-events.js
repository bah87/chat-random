const Message = require("../models/message");
const User = require("../models/user");
const { registerUser, requestRandomChat } = require("./socket-event-handlers");

exports = module.exports = function(io) {
  // Add socket.io listeners
  io.on("connection", socket => {
    console.log("a user connected", socket.id);

    socket.on("register user", registerUser(socket));

    socket.on("request random chat", requestRandomChat(socket));

    // socket.on("enter chat", chat => {
    //   socket.join(chat);
    //   console.log("joined", chat);
    // });

    // socket.on("leave chat", chat => {
    //   socket.leave(chat);
    //   console.log("left", chat);
    // });

    socket.on("new message", message => {
      // message should have chatId, body and author
      User.findOne({ username: message.author })
        .then(user => {
          console.log("found user. creating message", user);
          Message.create({ ...message, author: user._id })
            .then(message => {
              console.log("message created. emitting to other user", message);
              io.to(message.chatId).emit("new message", message);
            })
            .catch(err => console.log("unable to create message", err));
        })
        .catch(err => console.log("unable to find user", err));
    });

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
};
