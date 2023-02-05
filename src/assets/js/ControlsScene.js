import phaser from 'phaser';

export default class ControlsScene extends Phaser.Scene {
    constructor() {
        super('Controls');
    }

    preload ()
    {
        //this.load.spritesheet('food', '../src/assets/images/food.png', {frameWidth: 32, frameHeight: 32});
    }

    create() {
        //this.fruit1 = this.add.sprite(600,800,'food',327).setScale(2);
        this.add.text(200,200,"Controls: ", { fontSize: '64px', fill: '#fff' });

        this.add.text(200,300,"A: Left \nD: Right \nS: Shoot carroot \nT: Toot (from eating horseradish) \nENTER: Pick up root vegetable \nSPACE: Jump \nF11: Browser Fullscreen (toggle)",
            { fontSize: '16px', fill: '#fff' }
        );
        this.input.on('pointerdown', () => this.scene.start('Level'));
    }

    update() {

    }
}