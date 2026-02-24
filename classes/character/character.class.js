class Character extends MovableObject {
    x = 300;
    y = 190;
    height = 250;
    width = 150;
    world;
    speed = 10;

    idleImg = ['img/2_character_pepe/1_idle/idle/I-1.png', 'img/2_character_pepe/1_idle/idle/I-2.png', 'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png', 'img/2_character_pepe/1_idle/idle/I-5.png', 'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png', 'img/2_character_pepe/1_idle/idle/I-8.png', 'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    idleLongImg = ['img/2_character_pepe/1_idle/long_idle/I-11.png', '.img/2_character_pepe/1_idle/long_idle/I-12.png', 'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png', 'img/2_character_pepe/1_idle/long_idle/I-15.png', 'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png', 'img/2_character_pepe/1_idle/long_idle/I-18.png', 'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    walkingImg = ['../img/2_character_pepe/2_walk/W-21.png', '../img/2_character_pepe/2_walk/W-22.png', '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png', '../img/2_character_pepe/2_walk/W-25.png', '../img/2_character_pepe/2_walk/W-26.png'
    ];

    jumpingImg = ['img/2_character_pepe/3_jump/J-31.png', 'img/2_character_pepe/3_jump/J-32.png', 'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png', 'img/2_character_pepe/3_jump/J-35.png', 'img/2_character_pepe/3_jump/J-36.png', 'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png', 'img/2_character_pepe/3_jump/J-39.png'
    ];

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
        this.loadImages(this.jumpingImg);
        this.loadImages(this.deadImg);
        this.loadImages(this.hitImg);
        this.animate();
        this.energy = 100;
        this.applyGravity();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.moveRight();
            }
            if (this.world.keyboard.left && this.x > 0) {
                this.otherDirection = true;
                this.moveLeft();    
            }

            if (this.world.keyboard.space && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = - this.x + 200;

        }, standardFps);

        setInterval(() => {
            if (this.isHit()) {
                this.playAnimation(this.hitImg);
                this.playSound(this.hitSound, 0.25);
            } else
                if (this.isDead()) {
                   
                    
                    this.animateDeath(this.deadImg);
                    
                    
                    this.goUnderground();
                    if (!this.hasPlayed) {
                        this.playSound(this.deadSound, 0.25);
                        this.hasPlayed = true;
                    }
                    setTimeout(() => {
                        this.world.switchToScreen("lost");
                    }, 5000);
                } else
                    if (this.isAboveGround()) {
                        this.playAnimation(this.jumpingImg);
                        this.playSound(this.jumpSound, 0.25);
                    } else {
                        if (this.world.keyboard.right || this.world.keyboard.left) {
                            this.playAnimation(this.walkingImg);
                            this.playSound(this.walkSound, 0.25);
                        }
                    }
        }, 150);
    }
}