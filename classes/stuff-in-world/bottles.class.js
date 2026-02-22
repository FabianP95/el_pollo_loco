class Bottle extends DrawableObject {

    bottleImg = ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png']
    hitboxOffset = {
        top: 15,
        bottom: 22,
        left: 30,
        right: 44
    }
    collectBottleSound = new Audio('../assets/audio/items/collect-bottle.mp3');

    constructor() {
        super().loadImg('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.bottleImg);
        this.width = 75;
        this.height = 75;
        this.x = 450 + Math.random() * 400;
        this.y = 385;
    }
}