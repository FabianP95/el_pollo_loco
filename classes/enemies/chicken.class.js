class Chicken extends MovableObject {
    height = 70;
    width = 70;
    walkingImg = ['img/3_enemies_chicken/chicken_normal/1_walk/1_w.png', 'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    deadImg = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png']

    hitboxOffset = {
        top: 0,
        bottom: 8,
        left: 0,
        right: 0
    }

    deadSound = new Audio('../assets/audio/enemies/chicken/chicken-die.wav');

    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/3_w.png');
        this.loadImages(this.deadImg);
        this.x = 650 + Math.random() * 2000;
        this.energy = 5;
        this.y = canvasHeight - 40 - this.height;
        this.loadImages(this.walkingImg);
        this.speed = 0.2 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.handleLittleEnemiesMovement();
        }, standardFps);
        setInterval(() => {
            this.handleLittleEnemiesAnimation();
        }, 150);
    }

}