class Coin extends DrawableObject {

    coinImg = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png']
    hitboxOffset = {
        top: 25,
        bottom: 50,
        left: 24,
        right: 48
    }
    collectCoinSound = new Audio('../assets/audio/items/collect-coin.mp3');

    constructor() {
        super().loadImages(this.coinImg);
        this.loadImg('img/8_coin/coin_1.png');
        this.width = 75;
        this.height = 75;
        this.x = 400 + Math.random() * 1000;
        this.y = 385 - Math.random() * 300;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.coinImg);
        }, 350);
    }


}