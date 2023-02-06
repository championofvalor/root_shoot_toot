import phaser from 'phaser';

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super('Intro');
    }

    preload ()
    {
        this.load.spritesheet('food', '../src/assets/images/food.png', {frameWidth: 32, frameHeight: 32});
        //this.load.audio('music2','../src/assets/music/cmusic2.ogg');

        this.load.spritesheet('hero', '../src/assets/images/prabbit3.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('explosion', '../src/assets/images/exp.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('hootlet','../src/assets/images/hootlet.png');


    }

    create() {
        //this.fruit1 = this.add.sprite(600,800,'food',327).setScale(2);
        this.add.text(200,200,"Root Shoot & Toot !!!", { fontSize: '64px', fill: '#fff' });

        this.add.text(200,300,"The rootinest tootenist game around! Action hero McBoot the Astute Pi-root goes to \nfree the land of Yellow and Blue Flowers. A fierce Newt is in cahoots with The Great \nHoot Brute and it’s hootlets. They are determined to destitute the land and take all \nthe fruit and root vegetables for their own! Armed with carrots and horseradish can \nour hero uproot and shoot and toot enough to save the land and the root/fruit loot?! ", 
            { fontSize: '16px', fill: '#fff' }
        );

        this.add.sprite(100,300,'hero',130).setScale(2);
        this.add.sprite(500,150,'food',6).setScale(3);
        this.add.sprite(240,150,'food',7).setScale(3);
        this.add.sprite(280,150,'food',8).setScale(3);
        this.add.sprite(320,150,'food',9).setScale(3);

        this.add.sprite(800,150,'explosion',0);
        this.add.sprite(1100,300,'hootlet').setScale(.4);


        this.add.text(200,500,"CGDC Game Entry for Global Game Jam 2023: ROOTS!!!", { fontSize: '16px', fill: '#fff' });

        this.input.on('pointerdown', () => this.scene.start('Credits'));

        this.game.config.level = 1;
        this.game.config.carrots = 0;
        this.game.config.horse = 0;

        //this.music = this.sound.add('music2', {loop: true, volume:0.4});    
        //this.music.play();   

    }

    update() {

    }
}