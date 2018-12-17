const User = require("../models/user");
const Chat = require("../models/chat");
const Message = require("../models/message");
const { ircHelper } = require("../helpers");

const REGISTER_USER = "register user";
const REQUEST_RANDOM_CHAT = "request random chat";
const NEW_MESSAGE = "new message";

/**
 * TODO: Refactor to clean up promises
 * Use more helpers to eliminate redundant code
 */

const registerUser = socket => username => {
  User.create({ username })
    .then(user => {
      console.log("user registered", user.username);
      socket.emit(REGISTER_USER, user.username);
    })
    .catch(err => {
      console.log("failed to register user", username, err);
    });
};

const requestRandomChat = (socket, io) => username => {
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
                socket.emit(REQUEST_RANDOM_CHAT, { chatId: newChat._id });
                socket.join(newChat._id);
              })
              .catch(err => {
                console.log("failed to create chat", err);
              });
          } else {
            console.log("added to chat", chat);
            User.findById(chat.participants[0])
              .then(chatCreator => {
                console.log("found chat creator", chatCreator);
                socket.join(chat._id);
                io.to(chat._id).emit(REQUEST_RANDOM_CHAT, {
                  chatId: chat._id,
                  participants: [chatCreator.username, user.username]
                });
              })
              .catch(err => console.log("unable to find user", err));
          }
        }
      );
    })
    .catch(err => {
      console.log("failed to find user", err);
    });
};

const createMessage = (socket, io) => message => {
  // message should have chatId, body and author
  User.findOne({ username: message.author })
    .then(user => {
      console.log("found user. creating message", user);
      Message.create({ ...message, author: user._id })
        .then(newMessage => {
          console.log("message created. emitting to other user", newMessage);
          const { body, chatId, createdAt, updatedAt, _id } = newMessage;

          const { delay, newBody, hop } = ircHelper(body);

          if (hop) {
            const repairUser = requestRandomChat(socket, io);
            repairUser(user.username);
            socket.leave(chatId);

            // todo: when one user sends /hop, also request to repair the other user
            // need to exclude the 2 users from joining a chat together again
            // Chat.findById(chatId)
            //   .then(chat => {
            //     const otherUserId = chat.participants.filter(
            //       id => id !== user._id
            //     )[0];
            //     User.findById(otherUserId)
            //       .then(otherUser => repairUser(otherUser.username))
            //       .catch(err => console.log("could not find user", err));
            //   })
            //   .catch(err => console.log("could not find chat", err));
          } else {
            setTimeout(
              () =>
                io.to(chatId).emit(NEW_MESSAGE, {
                  _id,
                  author: user.username,
                  body: newBody,
                  chatId,
                  createdAt,
                  updatedAt
                }),
              delay
            );
          }
        })
        .catch(err => console.log("unable to create message", err));
    })
    .catch(err => console.log("unable to find user", err));
};

exports.socketEvents = { REGISTER_USER, REQUEST_RANDOM_CHAT, NEW_MESSAGE };
exports.registerUser = registerUser;
exports.requestRandomChat = requestRandomChat;
exports.createMessage = createMessage;
