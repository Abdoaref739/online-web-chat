const { Socket } = require("dgram");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/main.html");
});

io.on('connection', (socket) =>{
    console.log("connected")
    let clientUsername = "";

socket.on('chat message', (msg, username) => {
    io.emit('chat message', msg, username)
    clientUsername = username;
});

socket.on("disconnect", () => {
    console.log("disconnected")
});

});

server.listen(3000, () => {
    console.log("server is working")
});