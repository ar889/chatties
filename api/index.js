const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const http= require('http');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const userAuth = require("./routes/userAuthRoute");
const message = require("./routes/messageRoute");
const conversation = require("./routes/conversationRoute");
const search = require("./routes/searchRoute");
const app = express();
const server = http.createServer(app)
const { Server } = require("socket.io");
require('dotenv').config()


// socket 
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL
  }
});

// database
mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("connected to database");
});

// cors 
app.use(cors({
  origin:'http://localhost:3000',
  methods:['post','get','put','delete'],
  credentials:true
}))
app.use(cookieParser());
app.use(express.static('./public'))
  app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to home page.");
});

io.on('connection', (socket) => {
  console.log('a user connected to socket');
  socket.on('newMessage',(data)=>{
    io.emit('newMessage',data)
  })
});

// routes 
app.use("/auth", userAuth);
app.use("/message", message);
app.use("/conversation", conversation);
app.use("/search", search);

server.listen(process.env.PORT || 5000, (req, res) => {
  console.log("server is listning on port 5000");
});
