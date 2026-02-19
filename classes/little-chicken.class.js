class LittleChicken extends MovableObject {
    height = 40;
    width = 40;
    walkingImg = ['img/3_enemies_chicken/chicken_small/1_walk/1_w.png', 'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    deadImg = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/3_w.png');
        this.x = 450 + Math.random() * 400;
        this.y = canvasHeight - 40 - this.height;
        this.loadImages(this.walkingImg);
        this.speed = 0.2 + Math.random() * 0.15;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, standardFps);

        setInterval(() => {
            this.playAnimation(this.walkingImg);
        }, 150);
    }

}