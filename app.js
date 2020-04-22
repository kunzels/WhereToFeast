const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
// const io = require("socket.io-client");
const path = require('path');

const users = require("./routes/api/users");

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

const connections = [];

const http = require("http").Server(app);
const io = require("socket.io")(http);
io.on("connection", function (socket) {
  console.log("a user connected");

  connections.push(socket);
  console.log("Connected: %s sockets connected", connections.length);

  socket.on("disconnect", function () {
    connections.pop();
    console.log("User Disconnected");
  });

  socket.on("send message", function (msg) {
    io.sockets.emit("message: ", {message: msg});
  });
});
io.listen(8000);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));