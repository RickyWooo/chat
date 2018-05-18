var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening at port ${port}...`);
});

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res)=>{  
    res.sendFile( __dirname + '/public/index.html');
});

var numberOfUsers = 0;
// When a new user connect
// listen up a connection(from browser) event
io.on('connection', (socket)=>{
  console.log('a user connected.');
  socket.on('disconnect', ()=>{
    console.log('a user disconnected.');
    currentUser(--numberOfUsers);
  });
  currentUser(++numberOfUsers);
  //add a new user 
  socket.on('add',(username)=>{
    console.log(`new user: ${username} logged.`);
    io.emit('add',{username:username});
  });

  socket.on('chat',(data)=>{
    console.log(`${data.name} say: ${data.message}`);
    io.emit('chat',{username:data.name,message:data.message});
  });

});

function currentUser(numberOfUsers){
  console.log(`There are ${numberOfUsers} people online.`);
};


