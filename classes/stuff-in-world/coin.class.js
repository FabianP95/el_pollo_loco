class Coin extends DrawableObject {

    coinImg = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png']
    hitboxOffset = {
        top: 25,
        bottom: 50,
        left: 24,
        right: 48
    }
    
    constructor() {
        super().loadImages(this.coinImg);
        this.loadImg('img/8_coin/coin_1.png');
        this.width = 75;
        this.height = 75;
        this.x = 150 + Math.random() * 200;
        this.y = 385;
        this.animate();

    }

    animate() {
        /* setInterval(() => {
            this.bouncing();
        }, 300); */


        setInterval(() => {
            this.playAnimation(this.coinImg);
        }, 350);
    }

    bouncing() {
        switch (true) {
            case (this.y == 385):
                this.y -= 2;
                break;
            case (this.y == 383):
                this.y += 2;
                break;
        }
    }
}