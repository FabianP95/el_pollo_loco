class Cloud extends MovableObject {
    y = -10;
    height = 150;
    width = 150;
    constructor() {
        super().loadImg('img/5_background/layers/4_clouds/1.png');
         this.x = Math.random()*200;
    }
}