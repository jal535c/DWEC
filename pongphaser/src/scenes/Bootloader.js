class Bootloader extends Phaser.Scene {
  constructor() {
    super({ key: "Bootloader" });
  }


  preload() {
    this.load.image("ball", "./assets/ball.png");
    this.load.image("player1", "./assets/left_paddle.png");
    this.load.image("player2", "./assets/right_paddle.png");
    this.load.image("separator", "./assets/separator.png");    
  }


  create() {
    this.scene.start("Level1");
  }
}

export default Bootloader;