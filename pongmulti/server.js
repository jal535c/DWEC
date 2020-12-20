var players = [];
var b;

function Player(id, x,y, v, w,h, p) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.v = v;
  this.w = w;
  this.h = h;
  this.p = p;
}

function Ball(id, x,y, xv,yv, r) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.xv = xv;
  this.yv = yv;
  this.r = r;
}

var connections = [];   //number of users conected

var express = require('express');
var app = express();

var server = app.listen(3000);
/*
var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
server.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
*/

app.use(express.static('public'));

console.log("Server running on port 3000");

var socket = require('socket.io');
var io = socket(server);


function getCounter() {   //i need to know if it is the first player or the second
  io.sockets.emit('getCounter', connections.length);
}


function heartBeat() {    //update the player position
  io.sockets.emit('heartBeat', players); 
}
setInterval(heartBeat, 33);  //send every 33ms



function heartBeatBall() {      //update the ball position
  io.sockets.emit('heartBeatBall', b); 
}
setInterval(heartBeatBall, 33);  



io.sockets.on('connection', function(socket){
  connections.push(socket);
  getCounter();   //how many players, the client need to know left or right
  
  socket.on('start', function(data){
    console.log("a user conected: "+data.id+"number:"+connections.length);
    var p = new Player(socket.id, data.x, data.y, data.v, data.w, data.h, data.p);
    players.push(p);
  });
  
  socket.on('startBall', function(data){    
    b = new Ball(socket.id, data.x, data.y, data.xv, data.yv, data.r);    
  });

  socket.on('update', function(data){   //update the second player
    var pl;
    for (var i=0; i<players.length; i++) {
      if (socket.id === players[i].id)
        pl = players[i];
    }
    pl.x = data.x;
    pl.y = data.y;
    pl.v = data.v;
    pl.w = data.w;
    pl.h = data.h;
    pl.p = data.p;
  });

  socket.on('updateBall', function(data){    
    b.x = data.x;
    b.y = data.y;
    b.xv = data.xv;    
    b.yv = data.yv;    
    b.p = data.r;
  });

});