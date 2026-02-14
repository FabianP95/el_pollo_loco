class Coin extends DrawableObject {

    coinImg = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png']

    constructor() {
        super().loadImages(this.coinImg);
        this.loadImg('img/8_coin/coin_1.png');
        this.width = 75;
        this.height = 75;
        this.x = 150 + Math.random() * 200;
        this.y = 100;
        this.animate()

    }

    animate() {
        setInterval(() => {
            this.bouncing();
        }, 1000);


        setInterval(() => {
            this.playAnimation(this.coinImg);
        }, 350);
    }

    bouncing() {
        console.log(this.y);
        
        if (this.y >= 100) {
            this.y += 10;
        }
        if (this.y <= 130) {
            this.y -= 10;
        }
    }
}