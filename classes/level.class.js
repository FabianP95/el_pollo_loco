/**
 * Level class represents a game level with all its game objects.
 * Stores collections of enemies, clouds, background objects, coins, and bottles.
 * @class
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2700;

    /**
     * Creates a new level with the specified game objects.
     * @constructor
     * @param {MovableObject[]} enemies - Array of enemy objects
     * @param {Cloud[]} clouds - Array of cloud objects
     * @param {BackgroundObject[]} backgroundObjects - Array of background objects
     * @param {Coin[]} coins - Array of coin objects
     * @param {Bottle[]} bottles - Array of bottle objects
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins
        this.bottles = bottles
    }
}



