import phaser from 'phaser';

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super('Intro');
    }

    preload ()
    {
        //this.load.spritesheet('food', '../src/assets/images/food.png', {frameWidth: 32, frameHeight: 32});
    }

    create() {
        //this.fruit1 = this.add.sprite(600,800,'food',327).setScale(2);
        this.add.text(200,200,"Root Shoot & Toot !!!", { fontSize: '64px', fill: '#fff' });

        this.add.text(200,300,"The rootinest tootenist game around! Action hero McBoot the Astute Pi-root goes to \nfree the land of Yellow and Blue Flowers. A fierce Newt is in cahoots with The Great \nHoot Brute and it’s hootlets. They are determined to destitute the land and take all \nthe fruit and root vegetables for their own! Armed with carrots and horseradish can \nour hero uproot and shoot and toot enough to save the land and the fruit loot?! ", 
            { fontSize: '16px', fill: '#fff' }
        );

        this.add.text(200,500,"CGDC Game Entry for Global Game Jam 2023: ROOTS!!!", { fontSize: '16px', fill: '#fff' });

        this.input.on('pointerdown', () => this.scene.start('Credits'));

        this.game.config.level = 1;
        this.game.config.carrots = 0;
        this.game.config.horse = 0;

    }

    update() {

    }
}
