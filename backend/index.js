/** Express Sever */

const express = require('express');
const app = express();
const PORT = 4000;
const cors = require('cors');
const { userInfo } = require('os');
const http = require('http').Server(app);
let users = [];
app.use(cors());

// /** Integrating DB */
// //setup default mongoose connection
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://mongo:9YlaAN2vveffjdwVHaFZ@containers-us-west-45.railway.app:6553/test?authSource=admin');
// const postSchema = new mongoose.Schema({});
// const posts = mongoose.model('Post',postSchema,'Post');
// console.log(postSchema);

const socketIO = require('socket.io')(http,{
  cors:{
    origin: 'http://localhost:5173'
  }
});


socketIO.on('connection',(socket)=>{
  console.log(`⚡: ${socket.id} user just connected!`);

  // Send message to all users on the server
  socket.on('message',(data)=>{

    socketIO.emit('messageResponse', data)
    // console.log(data);
  });

  socket.on('typing',(data)=>socket.broadcast.emit('typingResponse',data));
  //Listens when a new user joins the server
  socket.on('newUser',(data)=>{
    //Adds the new user to the list of users
    users.push(data);

    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit('newUserResponse',users);
  });

  socket.on('disconnect',()=>{
    console.log('🔥: A user disconnected');

    users = users.filter((user)=> user.socketID !== socket.id);

    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  });
});

app.get('/api',(req,res)=>{
  res.json({
    message: 'hello world',
  });
});

http.listen(PORT,()=>{
  console.log(`Server listening on ${PORT}`);
});

