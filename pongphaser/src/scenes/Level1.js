import Paddle from '../gameObjects/Paddle.js';
import Ball from '../gameObjects/Ball.js';


class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: "Level1" });
  }


  create() {
    let center_width = this.sys.game.config.width/2;
    let center_height = this.sys.game.config.height/2;

    //separator
    this.add.image(center_width, center_height, "separator");

    //paddles
    this.player1 = new Paddle(this, 30, center_height, "player1");    
    this.player2 = new Paddle(this, this.sys.game.config.width-30, center_height, "player2");

    this.physics.world.setBoundsCollision(false, false, true, true);  //collide with wall up and down
    
    //ball    
    this.ball = new Ball(this, center_width, center_height, "ball");

    //physics
    this.physics.add.collider(this.ball, this.player1, this.collidePaddle, null, this);   //callback method
    this.physics.add.collider(this.ball, this.player2, this.collidePaddle, null, this);
  
    //keys for player right
    this.cursor = this.input.keyboard.createCursorKeys();
    //keys for player left
    this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    //text points
    this.pointTxt1 = this.add.text(100, 20, this.player1.points, {font:"25px Arial", fill:"yellow"});
    this.pointTxt2 = this.add.text(520, 20, this.player2.points, {font:"25px Arial", fill:"yellow"});
  }


  update() {
    if (this.ball.x < 0) {    //player2 make a goal
      this.player2.points++;
      this.pointTxt2.text = this.player2.points;
      this.ball.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);
    }

    if (this.ball.x > this.sys.game.config.width) {   //player1 make a goal
      this.player1.points++;
      this.pointTxt1.text = this.player1.points;
      this.ball.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);
    }

    if (this.cursor.down.isDown) {      //movement player2
      this.player2.body.setVelocityY(300);
    } else if (this.cursor.up.isDown) {
      this.player2.body.setVelocityY(-300);
    } else {
      this.player2.body.setVelocityY(0);
    }

    if (this.cursor_S.isDown) {     //movement player1
      this.player1.body.setVelocityY(300);
    } else if (this.cursor_W.isDown) {
      this.player1.body.setVelocityY(-300);
    } else {
      this.player1.body.setVelocityY(0);
    }
  }


  collidePaddle() {
    this.ball.setVelocityY(Phaser.Math.Between(-120, 120));   //ball random velocity Y
  }
}

export default Level1;