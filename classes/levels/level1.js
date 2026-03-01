let level1;



function loadLevel() {
        if (gameStarted) {
                level1 = new Level([
                        ...amountOfElementInWorld(6, LittleChicken),
                        ...amountOfElementInWorld(6, Chicken),
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

function amountOfElementInWorld(amount, enemy) {
        return Array.from({ length: amount }, () => new enemy());
}
