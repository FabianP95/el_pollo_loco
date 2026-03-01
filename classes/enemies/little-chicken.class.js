class LittleChicken extends MovableObject {
    height = 40;
    width = 40;
    walkingImg = ['img/3_enemies_chicken/chicken_small/1_walk/1_w.png', 'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    deadImg = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    deadSound = new Audio('../assets/audio/enemies/chicken/chicken-die.wav');


    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.walkingImg);
        this.loadImages(this.deadImg);
        this.x = 850 + Math.random() * 2000;
        this.y = canvasHeight - 48 - this.height;
        this.energy = 5;
        this.speed = 0.2 + Math.random() * 0.15;
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