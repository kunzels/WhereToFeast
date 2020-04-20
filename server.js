const express = require("express");
const app = express();
const port = 3000;
const http = require("http").createServer();

const io = require("socket.io")(http);

io.on("connection", (socket) => {
    socket.emit("welcome", "Hello and welcome to the socket.io server!");
});

http.listen(port, () => {
    console.log("Server is listening on localhost:" + port);
});