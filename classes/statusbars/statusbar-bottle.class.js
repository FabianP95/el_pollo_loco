/**
 * StatusBarBottle class displays the collected bottles status bar.
 * Extends DrawableObject to inherit drawing capability.
 * @class
 * @extends DrawableObject
 */
class StatusBarBottle extends DrawableObject {
    bottleBarImg = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ]

    /**
     * Creates a new bottle status bar.
     * Initializes position and loads bottle bar images.
     * @constructor
     */
    constructor() {
        super().loadImages(this.bottleBarImg);
        this.x = 20;
        this.y = 55;
        this.height = 60;
        this.width = 200;
        this.setPercentage(0);
    }

    /**
     * Updates the bottle bar image based on the given percentage.
     * @function
     * @param {number} percentage - Bottle percentage to display (0-100)
     * @returns {void}
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.bottleBarImg[this.updateBar()];
        this.img = this.imageCache[path];
    }
}