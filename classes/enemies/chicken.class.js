class Chicken extends MovableObject {
    height = 70;
    width = 70;
    walkingImg = ['img/3_enemies_chicken/chicken_normal/1_walk/1_w.png', 'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    deadImg = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    attackImg = ['img/4_enemie_boss_chicken/3_attack/G13.png', 'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png', 'img/4_enemie_boss_chicken/3_attack/G16.png', 'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png', 'img/4_enemie_boss_chicken/3_attack/G19.png', 'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    hitboxOffset = {
        top: 0,
        bottom: 8,
        left: 0,
        right: 0
    }


    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/3_w.png');
        this.loadImg(this.deadImg[0]);
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
            if (this.energy == 0) {

                
                

                return
            } else {

            }
        }, standardFps);
        setInterval(() => {
           
            
            this.playAnimation(this.walkingImg);
        }, 150);


    }


}