/**
 * ThrowableObject class represents a bottle that can be thrown by the character.
 * Extends MovableObject to inherit physics and collision detection.
 * Handles rotation animation and splash effects when hitting objects.
 * @class
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    /** @type {boolean} - Whether the bottle has shattered on impact */
    shattered = false

    /** @type {string[]} - Array of bottle rotation animation frames */
    rotationImg = ['img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /** @type {string[]} - Array of bottle splash/impact animation frames */
    splashImg = ['img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /** @type {string[]} - Array of bottle resting image */
    bottleImg = ['img/6_salsa_bottle/salsa_bottle.png'];

    /** @type {Object} - Hitbox offset values for collision detection */
    hitboxOffset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    };

    /** @type {number} - Damage dealt by the bottle when hitting enemies */
    damage = 50;

    /** @type {Audio} - Sound played when bottle hits an object */
    hitBottleSound = new Audio('../assets/audio/items/bottle-hit.mp3');
    /** @type {Audio} - Sound played when bottle is thrown */
    throwBottleSound = new Audio('../assets/audio/items/bottle-throw.mp3');



    /**
     * Creates a new ThrowableObject (bottle) instance.
     * Initializes position, direction, and animation images.
     * @constructor
     * @param {number} x - Starting X position of the bottle
     * @param {number} y - Starting Y position of the bottle
     * @param {boolean} direction - Throwing direction (true = left, false = right)
     */
    constructor(x, y, direction) {
        super().loadImages(this.rotationImg);
        this.loadImages(this.splashImg);
        this.loadImg(this.bottleImg[0]);
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.width = 75;
        this.height = 75;
        this.animate();
    }

    /**
     * Throws the bottle in the specified direction with initial velocity.
     * Sets up horizontal movement and applies gravity effect.
     */
    throw() {
        if (this.direction) {
            this.speedY = 20;
            this.x = this.x - 70;
            setInterval(() => {
                this.x -= 15;
            }, 25)
        } else {
            this.speedY = 20;
            setInterval(() => {
                this.x += 15;
            }, 25)
        }
        this.applyGravity();
    }

    /**
     * Sets up the bottle animation loop.
     * Switches between rotation and splash animation based on shattered state.
     * Immediately initiates the throw action.
     */
    animate() {
        setInterval(() => {
            switch (true) {
                case this.shattered:
                    this.stopAtLastImage(this.splashImg);
                    break;
                default: this.playAnimation(this.rotationImg);
                    break;
            }
        }, 50)
        this.throw();
    }



}