class Chicken extends MovableObject {
    height = 70;
    width = 70;
    walkingImg = ['img/3_enemies_chicken/chicken_normal/1_walk/1_w.png', 'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png', 
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    
    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/3_w.png')
        this.x = 150 + Math.random() * 200;
        this.y = canvasHeight - 40 - this.height;
        this.loadImages(this.walkingImg);
        this.speed = 0.2 + Math.random()*0.25;
        this.animate();
        this.moveLeft();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.walkingImg.length;
            let path = this.walkingImg[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 150)
    }

    
}