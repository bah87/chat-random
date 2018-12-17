const User = require("../models/user");
const Chat = require("../models/chat");
const Message = require("../models/message");

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

exports.createMessage = io => message => {
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
};
