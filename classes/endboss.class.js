class Endboss extends MovableObject {
    height = 400;
    width = 250;
    walkingImg = ['img/4_enemie_boss_chicken/2_alert/G5.png', 
        'img/4_enemie_boss_chicken/2_alert/G6.png', 
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor(){
        super().loadImg(this.walkingImg[0]);
        this.loadImages(this.walkingImg);
        this.x = 1200;
        this.y = canvasHeight -30 - this.height;
        this.animate()
    }

     animate() {
        setInterval(() => {
            this.playWalkingAnimation(this.walkingImg); 
        }, 150)
    }    

}