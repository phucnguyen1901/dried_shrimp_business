
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./configs/connectDB")
const authRoute = require("./routes/api_auth_routes");
const cookieParser = require('cookie-parser')
const cors = require("cors")

//socket
const { createServer } = require("http");
const { Server } = require("socket.io");


const app = express();
const port = process.env.PORT || 3333
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors:{
    origin: '*'
  } 
});


// Configs
app.use(express.json())
app.use(cookieParser());
// app.use(cors());
dotenv.config();
connectDB();


//Router
authRoute(app);

//socket
let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", handleTime(response));
};


const handleTime = (date) => {
    
  const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()

  
  return `${hour}:${minute}:${second}`

}



httpServer.listen(port, () => console.log("Server is runing with port " + port))






