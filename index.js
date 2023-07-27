const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const chatRoute = require('./routes/chat');
const messageRouter = require('./routes/messages');
const MentorRoutes = require('./routes/mentor');
const bodyParser = require('body-parser');
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB Connected!'))
  .catch((err) => console.log(err));
app.use(express.json());

app.get('/', function (req, res) {
  res.send('<h1>MYCLAN API IS RUNNING</h1><br>');
});



app.use('/api/', authRoute);
app.use('/api/users', userRoute);
app.use('/api/mentor', MentorRoutes);
app.use('/api/chat', chatRoute);
app.use('/api/messages', messageRouter);

const server = app.listen(process.env.PORT || 5002, () =>
  console.log(`app listening on port ${process.env.PORT || 5002}!`)
);

const io = require('socket.io')(server, {
  pingTimeOut:60000,
  cors: {
    origin: "https://mycalnapi.onrender.com/"
  },
});


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('setup',(userId)=>{
    socket.join(userId);
    socket.broadcast.emit('online-user',userId)
    console.log("User joined", userId,"room")
  });

  socket.on('typing',(room) =>{
    console.log("typing");
    socket.broadcast.to(room).emit('typing')
  });

  socket.on('stop-typing',(room) =>{
    console.log("stop typing");
    socket.broadcast.to(room).emit('stop-typing')
  });

  socket.on('join Chat',(room)=>{
    socket.join(room);
    console.log("User joined", room,"room")
  });

  socket.on('new message',(newMessage)=>{
    console.log("new message",newMessage);
    var chat  = newMessage.chat;
    var room = chat._id;
    var sender = newMessage.sender;

    if(!sender || sender._id){
      return console.log("No sender")
    }
    var senderid = sender._id;
    console.log(senderid);
    const users = chat.users;
    console.log(users);

    socket.broadcast.to(newMessage.chat).emit('message received',newMessage);
    socket.broadcast.to(newMessage.chat).emit('message received',"sent message");
    
  });

  socket.off('setup',()=>{
    console.log("User disconnected");
    socket.leave(userId);
  })

});