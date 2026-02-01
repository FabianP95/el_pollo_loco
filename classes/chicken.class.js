class Chicken extends MovableObject {
    height = 70;
    width = 70;
    constructor() {

        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/3_w.png')
        this.x = 150 + Math.random() * 200;
        this.y = canvasHeight - 40 - this.height;
    }
}