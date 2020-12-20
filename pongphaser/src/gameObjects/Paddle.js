class Paddle extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    
    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.body.immovable = true;   //don't move if the ball push him
    
    this.body.setCollideWorldBounds(true);    //collide with the limits

    this.points = 0;
  }
}

export default Paddle;