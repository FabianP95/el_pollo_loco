class Chicken extends MovableObject {
    height = 70;
    width = 70;
    walkingImg = ['img/3_enemies_chicken/chicken_normal/1_walk/1_w.png', 'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    deadImg = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    hitboxOffset = {
        top: 0,
        bottom: 8,
        left: 0,
        right: 0
    }
    energy = 50;

    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/3_w.png');
        this.x = 550 + Math.random() * 200;
        this.y = canvasHeight - 40 - this.height;
        this.loadImages(this.walkingImg);
        this.speed = 0.2 + Math.random() * 0.25;
        this.animate();

    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, standardFps);
        if (this.energy == 0) {
            setInterval(() => {
                this.playAnimation(this.deadImg[0]);
            }, 150);
        } else {
            setInterval(() => {
                this.playAnimation(this.walkingImg);
            }, 150);
        }

    }
}