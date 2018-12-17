# chat-random

Simple private messaging app built with React, Redux, Node, Express, Socket.io and MongoDB. Users can enter with a username and will be paired with the next available user.

The following commands are available to users:<br>

- Send "/delay 3000 hello" to delay the message "hello" by 3 seconds
- Send "/hop" to be re-paired with another user

## Setup

In the client directory run:

```
npm install
npm start
```

In another tab start the MongoDB daemon with:

```
mongod
```

In a third tab, cd into the server directory and run:

```
npm install
node index.js
```

Visit `http://localhost:3000` in your browser to view the app. Open up multiple tabs to communicate back and forth.
