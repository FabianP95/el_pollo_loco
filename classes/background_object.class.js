/**
 * BackgroundObject class represents static background elements in the game world.
 * Extends MovableObject to inherit drawing capabilities.
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    /** @type {number} - Standard width for background objects */
    width = 720;
    /** @type {number} - Standard height for background objects */
    height = 480;
    
    /**
     * Creates a new background object with the specified image and position.
     * @constructor
     * @param {string} imgPath - Path to the background image
     * @param {number} x - X position of the background object
     */
    constructor(imgPath, x) {
        super().loadImg(imgPath);
        this.y = canvasHeight - this.height;
        this.x = x;
    }
}