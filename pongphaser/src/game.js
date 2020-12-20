import Bootloader from './scenes/Bootloader.js';
//const Bootloader = require('./bootloader.js');
import Level1 from './scenes/Level1.js';


var config = {
  width: 640,
  height: 400,
  parent: "wrapper",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  scene: [Bootloader, Level1]
};


var game = new Phaser.Game(config);     //create the game


