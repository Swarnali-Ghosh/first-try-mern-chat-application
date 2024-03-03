const app = require(`./app`);
const dotenv = require(`dotenv`)
const socket = require("socket.io")
dotenv.config({ path: "config/config.env" })
const databaseConnection = require(`./config/database`)

// connect database
databaseConnection();

// create server
const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;

    // console.log("socket work")

    socket.on("add-user", (currentUserId) => {
        console.log("socket work currentUserId", currentUserId)
        onlineUsers.set(currentUserId, socket.id);
    })


    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            console.log({ data })
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    })


})