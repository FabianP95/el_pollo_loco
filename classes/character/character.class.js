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
        'img/2_character_pepe/5_dead/D-54.png', 'img/2_character_pepe/5_dead/D-55.png', 'img/2_character_pepe/5_dead/D-56.png', 'img/2_character_pepe/5_dead/D-57.png'
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

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                return
            }
            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.moveRight();
            }
            if (this.world.keyboard.left && this.x > 0) {
                this.otherDirection = true;
                this.moveLeft();
            }

            if (this.world.keyboard.space && !this.isAboveGround() && this.timeOut > 1.5) {
                this.jump();
                this.timeLastJump = Date.now();
            }
            this.world.camera_x = - this.x + 200;
            if (this.speedY <= 0 && this.isAboveGround()) {
                this.falling = true;
            }
            if (this.speedY <= 0 && !this.isAboveGround()) {
                this.falling = false;
            }
            this.timeOut = this.world.timePassed(this.timeLastJump);

        }, standardFps);

        setInterval(() => {
            switch (true) {
                case this.isHit():
                    this.playAnimation(this.hitImg);
                    this.playSound(this.hitSound, 0.25);
                    break;
                case this.isDead():
                    this.animateDeath(this.deadImg);
                    this.goUnderground();
                    if (!this.hasPlayed) {
                        this.playSound(this.deadSound, 0.25);
                        this.hasPlayed = true;
                    }
                    setTimeout(() => {
                        this.world.switchToScreen("lost");
                    }, 3000);
                    break;
                case this.isAboveGround() && !this.falling:
                    this.animateDeath(this.jumpingUpImg);
                    this.playSound(this.jumpSound, 0.25);
                    break;
                case this.isAboveGround() && this.falling:
                    this.animateDeath(this.jumpingDownImg);
                    break;
                case this.world.keyboard.right || this.world.keyboard.left:
                    this.playAnimation(this.walkingImg);
                    this.playSound(this.walkSound, 0.25);
                    break;
                case this.idle: this.animateDeath(this.idleImg);
                    break;
                case this.longIdle: this.playAnimation(this.idleLongImg);
                    break;
                default:
                    break;
            }
        }, 100);
    }

}