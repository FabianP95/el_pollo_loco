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
        this.x = 550 + Math.random() * 200;
        this.energy = 50;
        this.y = canvasHeight - 40 - this.height;
        this.loadImages(this.walkingImg);
        this.speed = 0.2 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            if (this.isDead()) {
                this.goUnderground()
                return
            } else {
                this.moveLeft();
            }
        }, standardFps);

        setInterval(() => {
            if (this.isDead()) {
                this.animateDeath(this.deadImg);
                if (!this.hasPlayed) {
                    this.playSound(this.deadSound, 0.15);
                    this.hasPlayed = true;
                }
            } else {
                this.playAnimation(this.walkingImg);
            }
        }, 150);


    }


}