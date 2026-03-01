class Cloud extends MovableObject {

    height = 250;
    width = 250;
    constructor(x, y) {
        super().loadImg('img/5_background/layers/4_clouds/1.png');
        this.y = y;
        this.x = x;

        setInterval(() => {
            this.moveLeft();
        }, 33);
    }


}