class Coin extends DrawableObject {

    coinImg = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png']

    constructor() {
        super().loadImages(this.coinImg);
        this.loadImg('img/8_coin/coin_1.png');
        this.width = 40;
        this.height = 40;
        this.x = Math.random();
        this.y = 100;
       
    }
}