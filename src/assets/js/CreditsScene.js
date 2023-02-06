import phaser from 'phaser';

export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super('Credits');
    }

    preload ()
    {
        //this.load.spritesheet('food', '../src/assets/images/food.png', {frameWidth: 32, frameHeight: 32});
    }

    create() {
        //this.fruit1 = this.add.sprite(600,800,'food',327).setScale(2);
        this.add.text(200,200,"Credits!", { fontSize: '64px', fill: '#fff' });

        this.add.text(200,300,"Created by de la Croix Studios (aka our Family): \nProteusDad \nDunamiss \nShineyEyes \nGalaxite \nKittyPrincess", 
            { fontSize: '16px', fill: '#fff' }
        );

        this.input.on('pointerdown', () => this.scene.start('Controls'));        

    }

    update() {

    }
}