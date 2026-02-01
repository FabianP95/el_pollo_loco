class Chicken extends MovableObject {
    constructor(){
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/3_w.png')
        this.x = 50 + Math.random()*200;
    }
}