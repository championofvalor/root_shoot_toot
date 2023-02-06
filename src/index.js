import IntroScene from './assets/js/IntroScene.js';
import CreditsScene from './assets/js/CreditsScene.js';
import ControlsScene from './assets/js/ControlsScene.js';
import LevelScene from './assets/js/LevelScene.js';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
	height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.RESIZE
    },
    scene: [
        IntroScene,
        CreditsScene,
        ControlsScene,
        LevelScene
    ],
    
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                y: 450,
            }
        }
    }
};

const game = new Phaser.Game(config);
