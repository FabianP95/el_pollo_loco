/**
 * StatusBarCoin class displays the collected coins status bar.
 * Extends DrawableObject to inherit drawing capability.
 * @class
 * @extends DrawableObject
 */
class StatusBarCoin extends DrawableObject {
    coinBarImg = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ]

    /**
     * Creates a new coin status bar.
     * Initializes position and loads coin bar images.
     * @constructor
     */
    constructor() {
        super().loadImages(this.coinBarImg);
        this.x = 20;
        this.y = 110;
        this.height = 60;
        this.width = 200;
        this.setPercentage(0);
    }

    /**
     * Updates the coin bar image based on the given percentage.
     * @param {number} percentage - Coin percentage to display (0-100)
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.coinBarImg[this.updateBar()];
        this.img = this.imageCache[path];
    }
}