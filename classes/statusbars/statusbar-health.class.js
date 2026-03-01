/**
 * StatusbarHealth class displays the character's health status bar.
 * Extends DrawableObject to inherit drawing capability.
 * @class
 * @extends DrawableObject
 */
class StatusbarHealth extends DrawableObject {

    /** @type {number} - Current health percentage (0-100) */
    percentage = 100;

    healthBarImg = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ]

    /**
     * Creates a new health status bar.
     * Initializes position and loads health bar images.
     * @constructor
     */
    constructor() {
        super().loadImages(this.healthBarImg);
        this.x = 20;
        this.y = 0;
        this.height = 60;
        this.width = 200;
        this.setPercentage(100);
    }

    /**
     * Updates the health bar image based on the given percentage.
     * @function
     * @param {number} percentage - Health percentage to display (0-100)
     * @returns {void}
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.healthBarImg[this.updateBar()];
        this.img = this.imageCache[path];
    }
}