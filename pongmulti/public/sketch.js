var p;
var b;

var players=[]; 
var socket;
var balls = [];

var go = false;   //if 2 players go inside, start the game
var counter =0;   //counter of players, for draw left or right

function setup() {
  socket = io.connect("http://localhost:3000");
  //socket = io();

  createCanvas(600, 600);
  //p = new Player();
  b = new Ball();

  //test socket only with 1 ball
  /*for (var i = 0; i < 4; i++) {   
    balls[i] = new Ball();
  }*/
  

  socket.on('getCounter', function(data){
    counter = data;
    if (p === undefined) {
      if (counter%2 === 0) 
        p = new Player(0);
      else 
        p = new Player(width);
      
    }

    var data = {
      x: p.x,
      y: p.y,
      v: p.v,
      w: p.w,
      h: p.h,
      p: p.p
    };
    socket.emit('start', data);


    var data = {
      x: b.x,
      y: b.y,
      xv: b.xv,
      yv: b.yv,
      r: b.r
    };
    socket.emit('startBall', data);


    if (counter===2) {    
      go=true;
    }
      
  });
  

  socket.on('heartBeat', function(data){  //still thread here for data, not in draw function (only draw)
    players = data;
  });

  socket.on('heartBeatBall', function(data){
    if (data !== null) {
      b.x = data.x;
      b.y = data.y;
      b.xv = data.xv;
      b.yv = data.yv;
      b.r = data.r;
    }
  });

}

function draw() {
  background(0);
  rect(width/2, 0, 10, 600);
  textSize(48);
  fill(0, 102, 153);
  //text(p.points, 30, 40);
  //text(a.points, width - 80, 40);
  
  if (go===true) {
    p.show();
    p.move(b);
    b.show();    
    b.move();
  
    if (b.collision(p) && p.x===0) 
      b.xv = 5;
    if (b.collision(p) && p.x===width)
      b.xv = -5;

  
    if (b.x < 0) {
      //p.points++;
      throwBall();
    }
  

    if (b.x > width) {
      //p.points++;  
      throwBall();  
    }

    for (var i=0; i<players.length; i++) {    //draw the enemy
      var id = players[i].id;
      if (id !== socket.id) {
        fill(255,0,0);
        rectMode(CENTER);
        rect(players[i].x, players[i].y, players[i].w, players[i].h);
        //text(p.points, width - 80, 40);
      }
    }

    var data = { 
      x: p.x,
      y: p.y,
      v: p.v,
      w: p.w,
      h: p.h,
      p: p.p
    };
    socket.emit('update', data);

    var data = { 
      x: b.x,
      y: b.y,
      xv: b.xv,
      yv: b.yv,
      r: b.r
    };
    socket.emit('updateBall', data);

  }
}

function throwBall() {    //put the ball in center
  b.x = width/2;
  b.y = height/2;
}


