class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    
    scene.add.existing(this);
    scene.physics.world.enable(this);
        
    this.body.setCollideWorldBounds(true);    //collide with the limits
    this.body.setBounce(1);         //bouns with the same velocity
    
    this.setVelocityX(-280);
  }
}

export default Ball;