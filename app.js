const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
// const io = require("socket.io-client");
const path = require('path');

const users = require("./routes/api/users");

const connections = [];
const rooms = [];

// const http = require("http").Server(app);
// const io = require("socket.io")(http);
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 5000;
// io.on("connection", function (socket) {
//   console.log("a user connected");

//   connections.push(socket);
//   console.log("Connected: %s sockets connected", connections.length);

//   socket.on("disconnect", function () {
//     connections.pop();
//     console.log("User Disconnected");
//   });
// // CLIENT <--> SERVER <--> CLIENT
//   socket.on("send message", function (data) {
//     io.sockets.emit("receive message", data);
//     console.log("Message sent!");
//   });

//   socket.on("typing", function(data){
//     socket.broadcast.emit("typing", data);
//   });
// });

io.on("connection", (socket) => {
  console.log("a user connected");

  connections.push(socket);
  console.log("Connected: %s sockets connected", connections.length);
  console.log("There are currently %s rooms active", rooms.length);

  socket.on("disconnect", function (data) {
    connections.pop();
    console.log("User Disconnected");
  });
// CLIENT <--> SERVER <--> CLIENT
  socket.on("createRoom", (room) => {
    rooms.push(room)
    socket.join(room)
    console.log("Successfully created room: " + room);
  })

  socket.on("joinRoom", (room) => {
    if (rooms.includes(room)){
      socket.join(room);
      console.log("Successfully joined " + room);
    } else {
      return socket.emit("err", "ERROR, no room under the name " + room);
    }
  });

  socket.on("send message", function (data) {
    io.in(data.roomName).emit("receive message", data);
    console.log("Message sent!");
  });

  socket.on("typing", function(data){
    socket.broadcast.emit("typing", data);
  });
});

// app.listen(port, () => console.log(`Server is running on port ${port}`));
server.listen(port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);