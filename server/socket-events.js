const User = require("./models/user");
const Chat = require("./models/chat");
const Message = require("./models/message");

exports = module.exports = function(io) {
  // Add socket.io listeners
  io.on("connection", socket => {
    console.log("a user connected", socket.id);

    socket.on("register user", username => {
      User.create({ username }).then(
        user => {
          console.log("user registered", user.username);
          socket.emit("register user", user.username);
        },
        err => {
          console.log("failed to register user", username, err);
        }
      );
    });

    socket.on("request random chat", username => {
      User.find({ username }).then(
        user => {
          console.log("found user. adding to chat", user);
          Chat.findOneAndUpdate(
            { isOpen: true },
            { $set: { isOpen: false }, $push: { participants: user.id } },
            { new: true },
            (err, chat) => {
              if (err) {
                console.log("no open chats", err);
                Chat.create({ participants: [user.id] }).then(
                  newChat => {
                    console.log("created chat", newChat);
                    socket.emit("request random chat", newChat);
                  },
                  err => {
                    console.log("failed to create chat", err);
                  }
                );
              } else {
                console.log("added to chat", chat);
                socket.emit("request random chat", chat);
              }
            }
          );
        },
        err => {
          console.log("failed to find user", err);
        }
      );
    });

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
      Message.create({ ...message });
      io.sockets.in(chat).emit("refresh messages", chat);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
};
