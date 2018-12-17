const User = require("../models/user");
const Chat = require("../models/chat");

exports.registerUser = socket => username => {
  User.create({ username })
    .then(user => {
      console.log("user registered", user.username);
      socket.emit("register user", user.username);
    })
    .catch(err => {
      console.log("failed to register user", username, err);
    });
};

exports.requestRandomChat = socket => username => {
  User.findOne({ username })
    .then(user => {
      console.log("found user. adding to chat", user);
      Chat.findOneAndUpdate(
        { isOpen: true },
        { $set: { isOpen: false }, $push: { participants: user._id } },
        { new: true },
        (err, chat) => {
          if (err) {
            console.log("error finding and/or updating chat", err);
          } else if (!chat) {
            console.log("no open chats");
            Chat.create({
              participants: [user.id],
              isOpen: true
            })
              .then(newChat => {
                console.log("created and joined chat", newChat);
                socket.emit("request random chat", newChat._id);
                socket.join(newChat._id);
              })
              .catch(err => {
                console.log("failed to create chat", err);
              });
          } else {
            console.log("added to chat", chat);
            socket.emit("request random chat", chat._id);
            socket.join(chat._id);
          }
        }
      );
    })
    .catch(err => {
      console.log("failed to find user", err);
    });
};
