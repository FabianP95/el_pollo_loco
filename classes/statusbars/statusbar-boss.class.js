/**
 * StatusBarBoss class displays the endboss health status bar.
 * Extends DrawableObject to inherit drawing capability.
 * @class
 * @extends DrawableObject
 */
class StatusBarBoss extends DrawableObject {

    bossHealthBarImg = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ]

    /**
     * Creates a new boss health status bar.
     * Initializes position and loads boss health bar images.
     * @constructor
     */
    constructor() {
        super().loadImages(this.bossHealthBarImg);
        this.height = 60;
        this.width = 200;
        this.x = 2000;
        this.y = 20
        this.setPercentage(100);
    }

    /**
     * Updates the boss health bar image based on the given percentage.
     * @function
     * @param {number} percentage - Boss health percentage to display (0-100)
     * @returns {void}
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.bossHealthBarImg[this.updateBar()];
        this.img = this.imageCache[path];
    }
}