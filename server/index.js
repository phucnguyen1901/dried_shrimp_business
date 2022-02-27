
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./configs/connectDB")
const authRoute = require("./routes/api_auth_routes");
const cookieParser = require('cookie-parser')


//socket
const { createServer } = require("http");
const { Server } = require("socket.io");


const app = express();
const port = process.env.PORT || 3333
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });


// Configs
app.use(express.json())
app.use(cookieParser());
dotenv.config();
connectDB();


//Router
authRoute(app);

//socket

io.on("connection", (socket) => {
  console.log(socket.id);
});

httpServer.listen(port, () => console.log("Server is runing with port " + port))






