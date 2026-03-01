/**
 * Coin class represents collectible coins in the game.
 * Extends DrawableObject to inherit drawing capability.
 * @class
 * @extends DrawableObject
 */
class Coin extends DrawableObject {

    coinImg = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png']
    hitboxOffset = {
        top: 25,
        bottom: 50,
        left: 24,
        right: 48
    }
    collectCoinSound = new Audio('../assets/audio/items/collect-coin.mp3');

    /**
     * Creates a new Coin instance.
     * Initializes coin images and random position in the game world.
     * @constructor
     */
    constructor() {
        super().loadImages(this.coinImg);
        this.loadImg('img/8_coin/coin_1.png');
        this.width = 75;
        this.height = 75;
        this.x = 400 + Math.random() * 1000;
        this.y = 385 - Math.random() * 300;
        this.animate();
    }

    /**
     * Starts the coin animation loop.
     * Cycles through coin rotation images at regular intervals.
     * @function
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.coinImg);
        }, 350);
    }


}