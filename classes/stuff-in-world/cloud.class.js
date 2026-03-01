/**
 * Cloud class represents decorative clouds that move in the background.
 * Extends MovableObject to inherit movement capabilities.
 * @class
 * @extends MovableObject
 */
class Cloud extends MovableObject {

    height = 250;
    width = 250;
    /**
     * Creates a new Cloud instance.
     * Initializes cloud image and starts leftward movement.
     * @constructor
     * @param {number} x - Starting X position for the cloud
     * @param {number} y - Starting Y position for the cloud
     */
    constructor(x, y) {
        super().loadImg('img/5_background/layers/4_clouds/1.png');
        this.y = y;
        this.x = x;

        setInterval(() => {
            this.moveLeft();
        }, 33);
    }


}