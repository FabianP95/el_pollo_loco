/**
 * Bottle class represents collectible bottles in the game.
 * Extends DrawableObject to inherit drawing capability.
 * @class
 * @extends DrawableObject
 */
class Bottle extends DrawableObject {

    /** @type {string[]} - Array of bottle image paths */
    bottleImg = ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png']
    /** @type {Object} - Hitbox offset values for collision detection */
    hitboxOffset = {
        top: 15,
        bottom: 22,
        left: 30,
        right: 44
    }
    /** @type {Audio} - Sound played when bottle is collected */
    collectBottleSound = new Audio('../assets/audio/items/collect-bottle.mp3');

    /**
     * Creates a new Bottle instance.
     * Initializes bottle image and random position on the ground in the game world.
     * @constructor
     */
    constructor() {
        super().loadImg('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.bottleImg);
        this.width = 75;
        this.height = 75;
        this.x = 450 + Math.random() * 1000;
        this.y = 385;
    }
}