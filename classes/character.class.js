class Character extends MovableObject {
    x = 100;
    y = 190;
    height = 250;
    width = 150;
    world;
    speed = 10;
    walkingImg = ['../img/2_character_pepe/2_walk/W-21.png', '../img/2_character_pepe/2_walk/W-22.png', '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png', '../img/2_character_pepe/2_walk/W-25.png', '../img/2_character_pepe/2_walk/W-26.png'
    ];

    jumpingImg = ['img/2_character_pepe/3_jump/J-31.png', 'img/2_character_pepe/3_jump/J-32.png', 'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png', 'img/2_character_pepe/3_jump/J-35.png', 'img/2_character_pepe/3_jump/J-36.png', 'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png', 'img/2_character_pepe/3_jump/J-39.png'
    ]

    deadImg = ['img/2_character_pepe/5_dead/D-51.png', 'img/2_character_pepe/5_dead/D-52.png', 'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png', 'img/2_character_pepe/5_dead/D-55.png', 'img/2_character_pepe/5_dead/D-56.png', 'img/2_character_pepe/5_dead/D-57.png'

    ]

    hitImg = ['img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    hitboxOffset = {
        top: 105,
        bottom: 105,
        left: 30,
        right: 60
    }

    jumpSound = new Audio('../assets/audio/pepe/pepe-jump.mp3');
    hitSound = new Audio('../assets/audio/pepe/pepe-hit.mp3');
    deadSound = new Audio('../assets/audio/pepe/pepe-dead.mp3');

    hasPlayed = false;





    constructor() {
        super().loadImg('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.walkingImg);
        this.loadImages(this.jumpingImg);
        this.loadImages(this.deadImg);
        this.loadImages(this.hitImg);
        this.animate();
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
            this.world.camera_x = -this.x + 100;

        }, standardFps);

        setInterval(() => {
            if (this.isHit()) {
                this.playAnimation(this.hitImg);
                this.hitSound.play();
            } else
                if (this.isDead()) {
                    this.playAnimation(this.deadImg);
                    this.playDeadSound();
                } else
                    if (this.isAboveGround()) {
                        this.playAnimation(this.jumpingImg);
                    } else {
                        if (this.world.keyboard.right || this.world.keyboard.left) {
                            this.playAnimation(this.walkingImg);
                        }
                    }
        }, 50);

    }

    playDeadSound() {
        if (!this.hasPlayed) {
            this.deadSound.play();
            this.hasPlayed = true;
        }
    }


}