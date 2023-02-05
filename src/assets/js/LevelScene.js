import phaser from 'phaser';
import Player from './Player.js';
import Map from './Map.js';


export default class LevelScene extends Phaser.Scene {
    constructor() {
        super('Level');
    }

    preload ()
    {
        // Load our spritesheet, giving it a name
        this.load.spritesheet('hero', '../src/assets/images/prabbit3.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('newt', '../src/assets/images/rednewt.png', {frameWidth: 64, frameHeight: 64});

        this.load.spritesheet('food', '../src/assets/images/food.png', {frameWidth: 32, frameHeight: 32});

        this.load.spritesheet('explosion', '../src/assets/images/exp.png', {frameWidth: 64, frameHeight: 64});

        this.load.spritesheet('flowers', '../src/assets/images/flowers.png', {frameWidth: 128, frameHeight: 128});
        
        // Load in our tilemap image
        this.load.image('plains','../src/assets/maps/plains.png');
        this.load.image('grass_tiles','../src/assets/maps/grass_tiles.png');

        this.load.image('blue','../src/assets/images/blue.png');
        this.load.image('owl','../src/assets/images/owl.png');
        this.load.image('hootlet','../src/assets/images/hootlet.png');
        this.load.image('chest','../src/assets/images/chest.png');
        this.load.image('cage','../src/assets/images/cage.png');
        this.load.image('tail','../src/assets/images/newt_tail.png');


        // Load in the Tiled map JSON file
        //this.load.tilemapTiledJSON('map',   '../src/assets/maps/level1.json');
        this.load.tilemapTiledJSON('level1','../src/assets/maps/level1.json');
        this.load.tilemapTiledJSON('level2','../src/assets/maps/level2.json');
        this.load.tilemapTiledJSON('level3','../src/assets/maps/level3.json');
        this.load.tilemapTiledJSON('level4','../src/assets/maps/level4.json');
        this.load.tilemapTiledJSON('level5','../src/assets/maps/level5.json');


        // Load in the music file
        this.load.audio('pop','../src/assets/music/pop.ogg');
        this.load.audio('music1','../src/assets/music/corban_music2.ogg');
        

    }

    create() {

        this.level = this.game.config.level;

        if(this.level==1) {
            this.map = new Map(this, 'level1', 'grass_tiles', 'ground', 'collision','detail',77);
            this.player = new Player(this, 100,600,'hero',147);
        }
        else if (this.level==2) {
            this.map = new Map(this, 'level2', 'grass_tiles', 'ground', 'collision','detail',77);
            this.player = new Player(this, 100,4000,'hero',147);
        }
        else if (this.level==3) {
            this.map = new Map(this, 'level3', 'grass_tiles', 'ground', 'collision','detail',77);
            this.player = new Player(this, 100,1400,'hero',147);
        }
        else if (this.level==4) {
            this.map = new Map(this, 'level4', 'grass_tiles', 'ground', 'collision','detail',77);
            this.player = new Player(this, 100,7300,'hero',147);
            // testing
            //this.player = new Player(this, 1400,300,'hero',147);
        }
        else if (this.level==5) {
            this.map = new Map(this, 'level5', 'grass_tiles', 'ground', 'collision','detail',77);
            this.player = new Player(this, 100,600,'hero',147);
        }

        // temp
        console.log("level: "+this.game.config.level);

        
        this.player.setScale(1.8);
        this.player.body.setSize(30,60,true);

        this.createWorld();

        


        
        this.cameras.main.startFollow(this.player);        
        this.cameras.main.roundPixels = true;        
        this.cameras.main.setBounds(0,0,this.map.width, this.map.height);
        
        this.physics.world.setBounds(0,0,this.map.width , this.map.height);

        
        this.player.body.collideWorldBounds = true;        
        this.player.body.onWorldBounds = true;        
        this.player.body.world.on('worldbounds', this.freeze, this); //, this.player,);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.createInput();
        
        this.addCollisions();
        
        this.createAnimations();

        


        this.pop = this.sound.add('pop', {loop: false, volume:2.0});

        this.music = this.sound.add('music1', {loop: true, volume:0.4});        
        this.music.play();

        

        this.carrotCount = this.game.config.carrots;

        this.carrotText = this.add.text(64, 16, 'carrots: 0', { fontSize: '32px', fill: '#000' });
        this.carrotText.setScrollFactor(0, 0);

        this.horseCount = this.game.config.horse;
        this.horseText = this.add.text(64, 64, 'horseradishes: 0', { fontSize: '32px', fill: '#000' });
        this.horseText.setScrollFactor(0, 0);

        this.gameOver = false;

        this.once = false;

        /*
        this.carrot = this.physics.add.sprite(400,400,'food',6);
        this.carrot.body.setAllowGravity(false);
        this.carrot.setScale(1.5);
        this.carrot.setRotation(4);
*/
        /*this.carrotSpin = this.tweens.add({
            targets: this.carrot,
            flipX: true, 
            x: 500,
            duration: 100,
            repeat: -1,
            yoyo: true
        });
*/
        /* this works !!
        this.carrotSpin = this.tweens.add({
            targets: this.carrot,
            //x: 600,
            ease: 'Power1',
            duration: 3000,
            flipY: true,
            yoyo: true,
            repeat: -1,
            paused: true
        });

        this.carrotSpin.play();
        */


    }

    createWorld() {
        
        this.carrots = this.add.group();

        if(this.level == 1 || this.level == 5) {
            //this.carrots = this.add.group();        
            this.carrots.create(700,620,'food',6).setScale(2);
            this.carrots.create(825,620,'food',6).setScale(2);
            this.carrots.create(1225,390,'food',6).setScale(2);        
            this.carrots.create(2625,390,'food',6).setScale(2);
            this.carrots.create(2225,620,'food',6).setScale(2);
            this.carrots.create(3225,230,'food',6).setScale(2);

            this.horses = this.add.group();
            this.horses.create(2525,390,'food',174).setScale(2).setTint(0xe2fb35 );
        }
        else if(this.level == 4) {
            this.carrots.create(1000,7625,'food',6).setScale(2);
            this.carrots.create(1050,7625,'food',6).setScale(2);
            this.carrots.create(1100,7625,'food',6).setScale(2);
            this.carrots.create(1150,7625,'food',6).setScale(2);
            this.carrots.create(1200,7625,'food',6).setScale(2);
        }


        this.flowerY = 0;

        if(this.level == 1) {
            this.cage = this.physics.add.sprite(5600,800,'cage');
            this.cage.setImmovable(true);
            this.cage.setScale(0.2);
            this.physics.add.collider(this.cage, this.map.collisionLayer, this.freeze, null, this);

            this.flowerY = 820;
        }
        if(this.level == 2) {
            this.cage = this.physics.add.sprite(3650,2100,'cage');
            this.cage.setImmovable(true);
            this.cage.setScale(0.2);
            this.physics.add.collider(this.cage, this.map.collisionLayer, this.freeze, null, this);

            this.flowerY = 4205;
        }
        if(this.level == 3) {
            this.cage = this.physics.add.sprite(8900,1600,'cage');
            this.cage.setImmovable(true);
            this.cage.setScale(0.2);
            this.physics.add.collider(this.cage, this.map.collisionLayer, this.freeze, null, this);

            this.flowerY = 1745;
        }
        if(this.level == 4) {
            this.newt2 = new Player(this,100,100,'newt',117);
            this.newt2.setScale(5);
            this.newt2.body.setSize(30,60,true);
            this.newt2.body.setImmovable(true);
            this.physics.add.collider(this.newt2, this.map.collisionLayer, this.freeze, null, this);
            this.physics.add.collider(this.newt2, this.player, this.playerDeath, null, this);

            

            this.time.addEvent({
                delay: 1500,
                callback: ()=>{
                    
                    this.tailLaunch();
                },
                loop: false
            }); 
            

            this.flowerY = 7595;
        }
        if(this.level == 5) {


            this.flowerY = 820;
        }

        // build flowers

        this.flower1 = this.add.sprite(400,this.flowerY,'flowers',56).setScale(0.5);
        this.flower2 = this.add.sprite(460,this.flowerY,'flowers',56).setScale(0.5);
        this.flower2 = this.add.sprite(520,this.flowerY,'flowers',56).setScale(0.5);
        this.flower2 = this.add.sprite(580,this.flowerY,'flowers',56).setScale(0.5);
        this.flower2 = this.add.sprite(640,this.flowerY,'flowers',50).setScale(0.5);
        this.flower2 = this.add.sprite(700,this.flowerY,'flowers',50).setScale(0.5);
        this.flower2 = this.add.sprite(760,this.flowerY,'flowers',50).setScale(0.5);
        this.flower2 = this.add.sprite(820,this.flowerY,'flowers',50).setScale(0.5);
        
        if(this.level == 1 || this.level == 5) {            

            //Treasure chest & fruit loot
            this.chest = this.physics.add.sprite(6000,800,'chest');

            this.fruit1 = this.add.sprite(6000,800,'food',327).setScale(2);
            this.fruit2 = this.add.sprite(6010,830,'food',328).setScale(2);
            this.fruit3 = this.add.sprite(5990,810,'food',329).setScale(2);
            this.fruit4 = this.add.sprite(6020,820,'food',330).setScale(2);
            this.fruit5 = this.add.sprite(5980,840,'food',331).setScale(2);
            this.fruit6 = this.add.sprite(6030,790,'food',332).setScale(2);
            this.fruit7 = this.add.sprite(5970,850,'food',333).setScale(2);
            this.fruit8 = this.add.sprite(6020,800,'food',334).setScale(2);
        }
        else if(this.level == 2) {            

            //Treasure chest & fruit loot
            this.chest = this.physics.add.sprite(4150,2430,'chest');
            
        }
        else if(this.level == 3) {            

            //Treasure chest & fruit loot
            this.chest = this.physics.add.sprite(9000,1600,'chest');
            
        }
        else if(this.level == 4) {
            //Treasure chest & fruit loot
            this.chest = this.physics.add.sprite(50,50,'chest');
            this.newtLife = 3;
        }
        
        if(this.level == 5) {

            //this.chest = this.physics.add.sprite(6000,800,'chest');

            this.owl = this.physics.add.sprite(5200,500,'owl');
            this.owl.setScale(0.5);
            this.owlLife = 5;
            this.owlText = this.add.text(64, 126, 'Brute Hoot life: ' + this.owlLife, { fontSize: '32px', fill: '#000' });
            this.owlText.setScrollFactor(0, 0);
            this.owl.setImmovable(true);
            this.owl.setSize(400,550);
        }

        this.chest.setImmovable(true);
        this.chest.setScale(2);
        this.chest.setDepth(4);

        this.hootlets = this.add.group();

        this.hootlet = this.physics.add.sprite(800,300,'hootlet');
        this.hootlet.setScale(0.25).setSize(160,180);

        this.hootTween = this.tweens.add({
            targets: this.hootlet,            
            angle: { start: 20, to: -20},
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 500,
            repeat: -1,            // -1: infinity
            yoyo: true
        });

        this.hootlets.add(this.hootlet);
        

        

       
    }

    addCollisions() {
        
        this.physics.add.collider(this.player, this.map.collisionLayer, this.freeze, null, this);        
        this.physics.add.collider(this.hootlets, this.map.collisionLayer, this.freeze, null, this);        
        this.physics.add.collider(this.player, this.hootlets, this.playerDeath, null, this);
        this.physics.add.collider(this.chest, this.map.collisionLayer, this.freeze, null, this);
        this.physics.add.collider(this.player, this.chest, this.playerWins, null, this);

        if(this.level == 5) {
            this.physics.add.collider(this.owl, this.map.collisionLayer, this.freeze, null, this);
            this.physics.add.collider(this.player, this.owl, this.playerDeath, null, this);
        }
       

    }

    freeze() {
        
        if(this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0) {
           // this.player.anims.stop();
        }

    }

    createInput() {        

        this.cursors = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D});

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spacebar.on('down',this.doSpace.bind(this));
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);        
        this.enter.on('up', this.doEnter.bind(this));

        this.skey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.skey.on('up',this.doShoot.bind(this));

        this.tkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        this.tkey.on('down',this.useHorse.bind(this));

    }

    createAnimations() {

        // Used for tweaking the animations based on your speed and spritesheet
        this.frames1 = 12;
        this.frames2 = 15;

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('hero', { start: 131, end: 138 }),
            frameRate: this.frames2,
            repeat: -1,
            yoyo: false
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('hero', { start: 105, end: 112}),
            frameRate: this.frames2,
            repeat: -1,
            yoyo: false
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('hero', { start: 118, end: 125 }),
            frameRate: this.frames1,
            repeat: -1,
            yoyo: false
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hero', { start: 144, end: 151 }),
            frameRate: this.frames1,
            repeat: -1,
            yoyo: false
        });

        this.anims.create({
            key: 'poot',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1,
            yoyo: true
        });
    }

    
    mC(counter) {
        
        if(this.carrots.getChildren()[counter].active == true) {

            this.carrotSpin = this.tweens.add({
                targets: this.carrots.getChildren()[counter],
                y: this.carrots.getChildren()[counter].y-50,
                ease: 'Power1',
                duration: 500
                
            });

            this.time.addEvent({
                delay: 550,
                callback: ()=>{
                    
                    this.carrots.getChildren()[counter].visible=false;
                },
                loop: false
            }); 
            
            this.carrots.getChildren()[counter].active=false;
            this.carrotCount++;
            this.pop.play();
        }

    }

    mH(counter) {
        
        if(this.horses.getChildren()[counter].active == true) {

            this.horsesSpin = this.tweens.add({
                targets: this.horses.getChildren()[counter],
                y: this.horses.getChildren()[counter].y-50,
                ease: 'Power1',
                duration: 500                
            });

            this.time.addEvent({
                delay: 550,
                callback: ()=>{
                    
                    this.horses.getChildren()[counter].visible=false;
                },
                loop: false
            }); 
            
            this.horses.getChildren()[counter].active=false;
            this.horseCount++;
            this.pop.play();
        }
        
    }

    useHorse() {

        if(this.horseCount > 0) {

            let newx = this.player.x - 5;
            if(this.player.playerDirection == 'l') {
                newx = newx + 125;
            }

            this.toot = this.physics.add.sprite(newx,this.player.y+70,'explosion',0);
            this.toot.body.setAllowGravity(false);
            this.toot.body.setImmovable(true);
            this.toot.anims.play('poot');

            this.physics.add.collider(this.player, this.toot, this.playerDeath, null,this);
            this.physics.add.collider(this.toot, this.hootlets, this.burn, null,this);

            this.horseCount--;

        }
    }

    doEnter() {

        let counter = 0;
        var boundsA = this.player.getBounds();
            
        this.carrots.children.iterate((child) => {

            var boundsB = child.getBounds();

            if(Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB)){
                this.mC(counter);
            }

            counter++;
        });

        counter = 0;
        var boundsA = this.player.getBounds();
            
        this.horses.children.iterate((child) => {

            var boundsB = child.getBounds();

            if(Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB)){
                this.mH(counter);
            }

            counter++;
        });
    }

    doShoot() {

        if(this.carrotCount > 0) {
            this.carrotCount--;

            this.carrot = this.physics.add.sprite(this.player.x+30,this.player.y+70,'food',6);
            this.carrot.body.setAllowGravity(false);
            this.carrot.setScale(1.5);            

            if(this.player.playerDirection == 'r') {
                this.carrot.setRotation(4);
                this.carrot.setVelocityX(500);                
            }
            else {                
                this.carrot.setRotation(.8);
                this.carrot.setVelocityX(-500);
            }
            
            if(this.level == 5) {
                this.physics.add.collider(this.carrot, this.owl, this.hitOwl, null, this);
            }
            if(this.level == 4) {
                this.physics.add.collider(this.carrot, this.newt2, this.hitNewt, null, this);
            }
            this.physics.add.collider(this.carrot, this.hootlets, this.hitHootlet, null, this);
            this.physics.add.collider(this.carrot, this.map.collisionLayer, this.deadCarrot, null, this);
        }
    }

    deadCarrot(carrot, layer) {
        carrot.destroy();
    }

    burn(carrot,owl) {
        owl.destroy();
    }

    hitOwl(carrot,owl) {
        //carrot.visible = false;
        carrot.destroy();
        this.owlLife--;

        if(this.owlLife == 0) {
            //this.owl.visible = false;
            this.owl.destroy();
            
        }
    }

    hitNewt(carrot,owl) {
        //carrot.visible = false;
        carrot.destroy();
        this.newtLife--;

        if(this.newtLife == 0) {
            //this.owl.visible = false;
            this.newt2.destroy();
            
        }
    }

    hitHootlet(carrot,hootlet) {
        carrot.visible = false;
        
        hootlet.destroy();
        carrot.destroy();        
    }

    playerWins() {
        
        this.gameOver = true;
        this.music.stop();
        this.player.anims.stop();
        this.player.body.setVelocity(0);
        if(this.level < 5) {
            this.youWon = this.add.text(500,300, 'w00t !!!  Next Level...', { fontSize: '64px', fill: '#fff' });

            this.time.addEvent({
                delay: 1500,
                callback: ()=>{
                    
                    let level = this.game.config.level;
                    level++;
                    this.game.config.level = level;
                    this.game.config.carrots = this.carrotCount;
                    this.game.config.horse = this.horseCount;
                    this.scene.start('Level');
                },
                loop: false
            }); 
        }
        else {
            this.youWon = this.add.text(500,300, 'YOU WON!!!', { fontSize: '128px', fill: '#fff' });
        }
        
        this.youWon.setScrollFactor(0, 0);
        
        
    }

    playerDeath() {
            this.music.stop();
            this.player.visible = false;
            this.gameOver=true;
            //this.player.destroy();
            this.youLose = this.add.text(500,300, 'YOU LOSE :(', { fontSize: '128px', fill: '#fff' });
            this.youLose.setScrollFactor(0, 0);
            this.time.addEvent({
                delay: 1500,
                callback: ()=>{
                    
                    this.scene.start('Level');
                },
                loop: false
            }); 
    }

    doSpace() {
        if(this.player.body.velocity.y == 0) {
            this.player.body.setVelocityY(-483);
        } 
    }

    bossFight() {
        if(this.owlLife > 0) {
            //console.log('start making baddies');

            this.hootlet = this.physics.add.sprite(this.owl.x-50,400,'hootlet');
            this.hootlet.setScale(0.25).setSize(160,180);
            this.hootlet.setImmovable(true);
            this.hootlet.setVelocityY(-300); 
            this.physics.add.collider(this.hootlet, this.map.collisionLayer, this.freeze, null, this);            

            this.hootlets.add(this.hootlet);
        
            this.time.addEvent({
                delay: 2500,
                callback: ()=>{
                    
                    this.bossFight();
                },
                loop: false
            }); 
        }


    }

    openCage() {
        //if(this.owlLife > 0) {
            //console.log('start making baddies');

            this.hootlet = this.physics.add.sprite(this.cage.x, this.cage.y,'hootlet');
            this.hootlet.setScale(0.25).setSize(160,180);
            this.hootlet.setImmovable(true);
            this.hootlet.setVelocityY(-400); 
            this.physics.add.collider(this.hootlet, this.map.collisionLayer, this.freeze, null, this);            

            this.hootlets.add(this.hootlet);
        
            this.time.addEvent({
                delay: 2500,
                callback: ()=>{
                    
                    this.openCage();
                },
                loop: false
            }); 
        //}


    }

    tailLaunch() {
        
        if(this.newtLife > 0) {

            this.newt2.setFrame('147');
            this.time.addEvent({
                delay: 50,
                callback: ()=>{
                    
                    this.newt2.setFrame(117);
                },
                loop: false
            }); 

            this.tail = this.physics.add.sprite(this.newt2.x+210,this.newt2.y+280,'tail');
            this.tail.body.setAllowGravity(false);
            this.tail.setScale(5);            
            this.tail.setVelocityX(500);            
            this.physics.add.collider(this.tail, this.player, this.playerDeath, null, this);

            this.time.addEvent({
                delay: 3000,
                callback: ()=>{
                    
                    this.tailLaunch();
                },
                loop: false
            }); 
        }

    }

    update() {
        
        // Pass the cursors to the player.update() functions for movement
        if(this.gameOver == false) {
            this.player.update(this.cursors);
            
        }
        else {
            this.player.body.setVelocity(0);
        }

        //console.log(this.player.x + " " + this.player.y);

        this.carrotText.setText('carrots:' + this.carrotCount);
        this.horseText.setText('horseradishes:' + this.horseCount);
        
        this.hootlets.children.iterate((child) => {
            
            //if(this.owlLife < 1) { 
            //    child.setVelocity(0);
            //}
            //else {

                if(this.player.x < child.x) {
                    child.setVelocityX(-120);
                }
                else {
                    child.setVelocityX(120);
                }
            //}

        });

        if(this.level == 5) {
            //this.owlText.setText('Brute Hoot life:' + this.owlLife);          

            // Final boss fight

            if(this.owl.x - this.player.x < 500) {
                if(this.once == false) {
                    this.bossFight();
                    this.once = true;
                }
            }
        }
        else if(this.level < 4) {
            // Final boss fight

            if(this.cage.x - this.player.x < 900) {
                if(this.once == false) {
                    this.openCage();
                    this.once = true;
                }
            }
        }
    }

   
}
