const express = require("express")
const app = express();
const http = require('http').Server(app)
const port = 3002;
// const cors = require("cors")
// const { Server } = require("socket.io")
// app.use(cors())

// const server = http.createServer(app)
// app.use(cors())
const io = require('socket.io')(http,{
    cors: {
        origin: "*"
    }
});

io.listen(port, () => {
    console.log(`Server is running in Port...${port}`)
});

io.on('connection', (socket) => {
    console.log(`User Connected`);

    socket.on("join", (userName) => {
        socket.userName=userName;
    })
    socket.on("message", (data) => {

        console.log("Message Recived",data);
        io.emit("message",{
            userName : socket.userName,
            message: data.message,
        })
    })
})
