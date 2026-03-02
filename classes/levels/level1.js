let level1;
/**
 * Loads Level 1 with all enemies, clouds, background objects, coins, and bottles.
 * Populates the game world with randomly positioned game elements.
 */
function loadLevel() {
        if (gameStarted) {
                level1 = new Level([
                        ...amountOfElementInWorld(0, LittleChicken),
                        ...amountOfElementInWorld(0, Chicken),
                        new Endboss()
                ],
                        [
                                new Cloud(400, 0),
                                new Cloud(800, 50),
                                new Cloud(1300, 20),
                                new Cloud(1800, 80),
                                new Cloud(2800, 0),
                                new Cloud(4000, 0),
                                new Cloud(10000, 30),
                                new Cloud(6000, 40),
                        ],
                        [
                                new BackgroundObject('img/5_background/layers/air.png', -720),
                                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720),
                                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720),
                                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720),

                                new BackgroundObject('img/5_background/layers/air.png', 0),
                                new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
                                new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
                                new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

                                new BackgroundObject('img/5_background/layers/air.png', 720),
                                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720),
                                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720),
                                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720),

                                new BackgroundObject('img/5_background/layers/air.png', 720 * 2),
                                new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 2),
                                new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 2),
                                new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 2),

                                new BackgroundObject('img/5_background/layers/air.png', 720 * 3),
                                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720 * 3),
                                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720 * 3),
                                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720 * 3),

                                new BackgroundObject('img/5_background/layers/air.png', 720 * 4),
                                new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 4),
                                new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 4),
                                new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 4),
                        ],
                        [...amountOfElementInWorld(5, Coin),
                        ],
                        [
                                ...amountOfElementInWorld(5, Bottle),
                        ]
                );
        }
}

/**
 * Creates an array of game objects with the specified amount.
 * Used to create multiple instances of enemies, coins, or bottles.
 * @function
 * @param {number} amount - The number of objects to create
 * @param {class} enemy - The class to instantiate
 * @returns {Array} Array of new instances
 */
function amountOfElementInWorld(amount, enemy) {
        return Array.from({ length: amount }, () => new enemy());
}
