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


    constructor() {
        super().loadImg('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.walkingImg);
        this.loadImages(this.jumpingImg);
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
            if (this.isAboveGround()) {
                this.playWalkingAnimation(this.jumpingImg);
                this.touchedGround = true;
            } else {
                if (this.world.keyboard.right || this.world.keyboard.left) {
                    this.playWalkingAnimation(this.walkingImg);
                }
            }
        }, 50);

    }


}