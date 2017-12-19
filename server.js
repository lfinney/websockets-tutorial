var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  //Display user connection an disconnection
  io.emit('connection status', 'A user has connected');

  socket.on('typing', function(user) {
    io.emit('user typing', user)
  })

  socket.on('no typing', function() {
    io.emit('remove indicator')
  })

  socket.on('disconnect', function() {
    io.emit('connection status', 'A user has disconnected')
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
