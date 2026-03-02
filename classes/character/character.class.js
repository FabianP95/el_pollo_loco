/**
 * Character class represents the player-controlled character in the game.
 * Extends MovableObject to inherit physics and collision detection.
 * @class
 * @extends MovableObject
 */
class Character extends MovableObject {
    x = 100;
    y = 190;
    height = 250;
    width = 150;
    world;
    speed = 10;
    idle = false;
    longIdle = false;
    falling = false;
    timeLastJump = null;
    timeOut = 1.5;

    idleImg = ['img/2_character_pepe/1_idle/idle/I-1.png', 'img/2_character_pepe/1_idle/idle/I-2.png', 'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png', 'img/2_character_pepe/1_idle/idle/I-5.png', 'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png', 'img/2_character_pepe/1_idle/idle/I-8.png', 'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    idleLongImg = ['img/2_character_pepe/1_idle/long_idle/I-11.png', 'img/2_character_pepe/1_idle/long_idle/I-12.png', 'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png', 'img/2_character_pepe/1_idle/long_idle/I-15.png', 'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png', 'img/2_character_pepe/1_idle/long_idle/I-18.png', 'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    walkingImg = ['../img/2_character_pepe/2_walk/W-21.png', '../img/2_character_pepe/2_walk/W-22.png', '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png', '../img/2_character_pepe/2_walk/W-25.png', '../img/2_character_pepe/2_walk/W-26.png'
    ];

    jumpingUpImg = ['img/2_character_pepe/3_jump/J-31.png', 'img/2_character_pepe/3_jump/J-32.png', 'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png'
    ];

    jumpingDownImg = ['img/2_character_pepe/3_jump/J-35.png', 'img/2_character_pepe/3_jump/J-35.png', 'img/2_character_pepe/3_jump/J-36.png', 'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-36.png', 'img/2_character_pepe/3_jump/J-37.png', 'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png', 'img/2_character_pepe/3_jump/J-39.png'];

    deadImg = ['img/2_character_pepe/5_dead/D-51.png', 'img/2_character_pepe/5_dead/D-52.png', 'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png', 'img/2_character_pepe/5_dead/D-54.png', 'img/2_character_pepe/5_dead/D-54.png', 'img/2_character_pepe/5_dead/D-55.png', 'img/2_character_pepe/5_dead/D-55.png', 'img/2_character_pepe/5_dead/D-55.png', 'img/2_character_pepe/5_dead/D-56.png', 'img/2_character_pepe/5_dead/D-56.png', 'img/2_character_pepe/5_dead/D-56.png',
    ];

    hitImg = ['img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    hitboxOffset = {
        top: 95,
        bottom: 105,
        left: 22,
        right: 44
    };

    jumpSound = new Audio('../assets/audio/pepe/pepe-jump.mp3');
    hitSound = new Audio('../assets/audio/pepe/pepe-hit.mp3');
    deadSound = new Audio('../assets/audio/pepe/pepe-dead.mp3');
    walkSound = new Audio('../assets/audio/pepe/pepe-walk.mp3');

    /**
     * Creates a new Character instance.
     * Initializes all animation images, sounds, and physics properties.
     * @constructor
     */
    constructor() {
        super().loadImg('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.walkingImg);
        this.loadImages(this.jumpingUpImg);
        this.loadImages(this.jumpingDownImg);
        this.loadImages(this.deadImg);
        this.loadImages(this.hitImg);
        this.loadImages(this.idleImg);
        this.loadImages(this.idleLongImg);
        this.animate();
        this.energy = 100;
        this.applyGravity();
    }

    /**
     * Sets up animation intervals for character movement and animation updates.
     */
    animate() {
        setInterval(() => {
            this.moveCharacter();
        }, standardFps);
        setInterval(() => {
            this.decideAnimation();
        }, 100);
    }

    /**
     * Decides which animation to play based on character state.
     * Prioritizes hurt/death states, then jumping, then walking/idle.
     */
    decideAnimation() {
        if (this.isHit() || this.isDead()) {
            this.handleHurtState();
        }
        if (this.isAboveGround() && !this.falling) {
            this.handleJumpingUpAnimation();
        }
        if (this.isAboveGround() && this.falling) {
            this.stopAtLastImage(this.jumpingDownImg);
        }
        if (this.world.keyboard.right || this.world.keyboard.left) {
            this.handleWalkingAnimation();
        } else {
            this.handleIdleState();
        }
    }

    /**
     * Handles idle animation states (regular or long idle).
     * Plays different animations based on idle or longIdle flags.
     */
    handleIdleState() {
        if (this.idle) {
            this.stopAtLastImage(this.idleImg);
        }
        if (this.longIdle) {
            this.playAnimation(this.idleLongImg);
        }
    }

    /**
     * Plays walking animation and walking sound.
     * Called when character is moving horizontally.
     */
    handleWalkingAnimation() {
        this.playAnimation(this.walkingImg);
        this.playSound(this.walkSound, 0.25);
    }

    /**
     * Plays jumping up animation and jump sound.
     * Called when character is ascending during a jump.
     */
    handleJumpingUpAnimation() {
        this.stopAtLastImage(this.jumpingUpImg);
        this.playSound(this.jumpSound, 0.25);
    }

    /**
     * Handles character hurt state - either animation for being hit or death animation.
     */
    handleHurtState() {
        if (this.isDead()) {
            this.handleDeathAnimation();
        } else {
            this.playAnimation(this.hitImg);
            this.playSound(this.hitSound, 0.25);
        }
    }


    /**
     * Handles character death animation and transition to game over screen.
     * Plays death animation, sound, and triggers screen switch after delay.
     */
    handleDeathAnimation() {
        this.stopAtLastImage(this.deadImg);
        this.goUnderground();
        if (!this.hasPlayed) {
            this.playSound(this.deadSound, 0.25);
            this.hasPlayed = true;
        }
        setTimeout(() => {
            this.world.switchToScreen("lost");
        }, 2000);
    }


    /**
     * Updates character position based on keyboard input and camera position.
     * Manages walking and jumping movement every frame.
     */
    moveCharacter() {
        if (this.isDead()) {
            return
        }
        this.handleWalkingMovement();
        this.handleJumpingMovement();
        this.world.camera_x = - this.x + 200;
        this.timeOut = this.world.timePassed(this.timeLastJump);
    }

    /**
     * Handles character jumping movement.
     * Manages jump initiation, falling state, and jump cooldown.
     */
    handleJumpingMovement() {
        if (this.world.keyboard.space && !this.isAboveGround() && this.timeOut > 1.5) {
            this.jump();
            this.timeLastJump = Date.now();
        }
        if (this.speedY <= 0 && this.isAboveGround()) {
            this.falling = true;
        }
        if (this.speedY <= 0 && !this.isAboveGround()) {
            this.falling = false;
        }
    }

    /**
     * Handles character walking movement based on keyboard input.
     * Ensures character stays within level bounds and updates facing direction.
     */
    handleWalkingMovement() {
        if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
            this.otherDirection = false;
            this.moveRight();
        }
        if (this.world.keyboard.left && this.x > 0) {
            this.otherDirection = true;
            this.moveLeft();
        }
    }

}