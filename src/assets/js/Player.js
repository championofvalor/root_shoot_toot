export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,key,frame) {
        
        // call Parent constructor
        super(scene,x,y,key,frame); 
        
        // set local scene variable
        this.scene = scene;

        // this is the speed at which the character moves
        this.velocity = 190;

        // critical for movement, collisions, etc...
        this.scene.physics.world.enable(this);

        this.scene.add.existing(this);

        // origin sets the characters x,y coordinates to the upper left-hand corner of the sprite
        this.setOrigin(0,0);        

        this.playerDirection = 'r';

    }
    

    

    update(cursors) {

        // this function is called by the game scene update function        

        // Stop, then move if a key is pushed
        this.body.setVelocityX(0);
        
        // Used to track if ANY movement keys are pushed.  If not, the animations stop playing below
        var test = true;
        

        /*
          This is a complex setup to make the character move and face the "right" direction based on 
            up+left, down+right, etc....


        */
       /*
        if(cursors.up.isDown) {
            if(this.body.velocity.y == 0) {
                this.body.setVelocityY(-this.velocity*2);
            }
            test = false;
        } 
        /*
        else if(cursors.down.isDown) {
            this.body.setVelocityY(this.velocity);
            test = false;
        } 
*/
        if(cursors.left.isDown) {
            this.body.setVelocityX(-this.velocity);
            this.anims.play('left', true);    
            test = false;
            this.playerDirection = 'l';
        } 
        else if(cursors.right.isDown) {
            this.body.setVelocityX(this.velocity);
            this.anims.play('right', true);        
            test = false;
            this.playerDirection = 'r';
        }
        
/*
        if(cursors.down.isDown && !cursors.left.isDown && !cursors.right.isDown ) {
            this.anims.play('down', true);
            test = false;           
        }
        else if(cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown) {
            this.anims.play('up', true);
            test = false;
        }
        
        if(cursors.left.isDown) {
               
            test = false;
        } 
        else if(cursors.right.isDown) {
               
            test = false;
        }        

        // This makes the character speed constant, even when pushing up+left (for example) at the same time
        this.body.velocity.normalize().scale(this.velocity);
*/
        // No buttons pushed?  Stop the player animation
        if(test ) {
            this.anims.stop();
        }   

        
    }
}

