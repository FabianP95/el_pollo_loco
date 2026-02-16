class Bottle extends DrawableObject {

    bottleImg = ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png']
    hitboxOffset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    constructor() {
        super().loadImg('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.bottleImg);
        this.width = 75;
        this.height = 75;
        this.x = 450 + Math.random() * 400;
        this.y = 385;
    }
}