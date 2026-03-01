class World {

    character = new Character();
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    coins = level1.coins;
    collectibleBottle = level1.bottles;
    endboss = this.enemies.find(enemy => enemy instanceof Endboss);

    collectedCoins = [];
    collectedBottles = [];
    bottleCounter = 0;
    valueCoin = 0;
    valueBottles = 0;


    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    switch;

    statusBarHealth = new StatusbarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    statusBarBoss = new StatusBarBoss();

    backgroundMusic = new Audio('assets/audio/world/background-music.mp3');

    gameEnd = new GameOver();
    gameWon = new GameWon();


    /**
     * Creates a new World instance with canvas and keyboard input.
     * Initializes the drawing context, sets up the game world, and starts the game loop.
     * @constructor
     * @param {HTMLCanvasElement} canvas - The canvas element to draw on
     * @param {Keyboard} keyboard - The keyboard input handler
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.runChecks();
        /* this.playWorldMusic(); */
    }

    /**
     * Sets up world references for character and boss.
     * Connects game objects to the world instance for game logic.
     * @function
     * @returns {void}
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
        this.endboss.statusBarBossHealth = this.statusBarBoss;
    }

    /**
     * Draws the game over screen.
     * Displays background and game over screen overlay in continuous loop.
     * @function
     * @returns {void}
     */
    drawGameOver() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.gameEnd);
        let self = this;
        requestAnimationFrame(() => {
            self.drawGameOver();
        });
    }

    /**
     * Draws the game won screen.
     * Displays background and victory screen overlay in continuous loop.
     * @function
     * @returns {void}
     */
    drawGameWon() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.gameWon);
        let self = this;
        requestAnimationFrame(() => {
            self.drawGameWon();
        });
    }

    /**
     * Main draw loop that renders the game or end screens.
     * Checks game state and calls appropriate drawing method.
     * Runs continuously using requestAnimationFrame.
     * @function
     * @returns {void}
     */
    draw() {
        if (this.switch == "lost") {
            this.drawGameOver();
        } else {
            if (this.switch == "won") {
                this.drawGameWon();
            } else {
                this.addWholeWorld();
            }
        }
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    };

    /**
     * Renders all game objects in the correct order.
     * Handles camera translation and layers (backgrounds, enemies, collectibles, character, UI).
     * @function
     * @returns {void}
     */
    addWholeWorld() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        this.addCollectiblesToMap();
        this.addToMap(this.statusBarBoss);
        this.ctx.translate(-this.camera_x, 0);
        this.addStatusBarsToMap();
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Adds all collectible items (bottles and coins) to the map for drawing.
     * @function
     * @returns {void}
     */
    addCollectiblesToMap() {
        this.addObjectsToMap(this.collectibleBottle);
        this.addObjectsToMap(this.collectedBottles);
        this.addObjectsToMap(this.coins);
    }

    /**
     * Adds all status bars to the canvas.
     * Includes health, bottle, coin, and boss health bars.
     * @function
     * @returns {void}
     */
    addStatusBarsToMap() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
    }


    /**
     * Adds multiple objects to the map for drawing.
     * Iterates through an array of objects and draws each one.
     * @function
     * @param {DrawableObject[]} objects - Array of objects to draw
     * @returns {void}
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    };

    /**
     * Adds a single object to the map for drawing.
     * Handles image flipping if object is facing the opposite direction.
     * @function
     * @param {DrawableObject} movableObj - Object to draw
     * @returns {void}
     */
    addToMap(movableObj) {
        if (movableObj.otherDirection) {
            this.flipImg(movableObj)
        }
        movableObj.drawHitbox(this.ctx);
        movableObj.draw(this.ctx);
        if (movableObj.otherDirection) {
            this.flipImgBack(movableObj)

        }
    };

    /**
     * Flips an image horizontally for objects facing the opposite direction.
     * Saves canvas context and applies scaling transformation.
     * @function
     * @param {DrawableObject} movableObj - Object to flip
     * @returns {void}
     */
    flipImg(movableObj) {
        this.ctx.save();
        this.ctx.translate(movableObj.width, 0);
        this.ctx.scale(-1, 1);
        movableObj.x = movableObj.x * -1;
    }


    /**
     * Restores the canvas context after flipping an object.
     * Reverses the flip transformation.
     * @function
     * @param {DrawableObject} movableObj - Object that was flipped
     * @returns {void}
     */
    flipImgBack(movableObj) {
        movableObj.x = movableObj.x * -1;
        this.ctx.restore();
    }

    runChecks() {
        this.runDamageChecks();
        this.runCollectingChecks();
        setInterval(() => {
            this.checkThrow();
            this.setIdleSwitches();
        }, 100);

    }

    /**
     * Runs damage-related checks.
     * Checks for collisions with enemies and throws, and triggers endboss actions.
     * @function
     * @returns {void}
     */
    runDamageChecks() {
        setInterval(() => {
            this.distanceToEndboss();
            this.collisionThrow();
            this.collisionWithEnemy();
        }, 50);
    }

    /**
     * Runs collecting-related checks.
     * Checks if character collects coins or bottles.
     * @function
     * @returns {void}
     */
    runCollectingChecks() {
        setInterval(() => {
            this.collectingItems(this.coins, this.collectedCoins);
            this.collectingItems(this.collectibleBottle, this.collectedBottles);
        }, 50);
    }

    /**
     * Checks if character is collecting items and handles them appropriately.
     * Removes collected items from the game world.
     * @function
     * @param {DrawableObject[]} collectible - Array of items that can be collected
     * @param {DrawableObject[]} collectedArr - Array to store collected items
     * @returns {void}
     */
    collectingItems(collectible, collectedArr) {
        collectible.forEach((collected) => {
            if (this.character.isColliding(collected)) {
                if (collected instanceof Bottle) {
                    let bottle = collected;
                    this.handleCollectedBottle(bottle)
                }
                if (collected instanceof Coin) {
                    let coin = collected;
                    this.handleCollectedCoin(coin)
                }
                this.removeElementfromArray(collected);
            }
        })
    }

    /**
     * Handles a bottle being collected by the character.
     * Increases bottle counter and updates the status bar.
     * @function
     * @param {Bottle} collected - The bottle that was collected
     * @returns {void}
     */
    handleCollectedBottle(collected) {
        this.valueBottles += 20;
        this.bottleCounter++;
        this.statusBarBottle.setPercentage(this.valueBottles);
        collected.playSound(collected.collectBottleSound, 0.4)
    }

    /**
     * Handles a coin being collected by the character.
     * Increases coin value and updates the status bar.
     * @function
     * @param {Coin} collected - The coin that was collected
     * @returns {void}
     */
    handleCollectedCoin(collected) {
        if (this.valueCoin >= 100) {
            this.valueCoin = 100;
        }
        this.valueCoin += 20;
        this.statusBarCoin.setPercentage(this.valueCoin);
        collected.playSound(collected.collectCoinSound, 0.4)
    }

    /**
     * Checks for collisions between thrown bottles and enemies.
     * Triggers damage calculation when bottle hits an enemy.
     * @function
     * @returns {void}
     */
    collisionThrow() {
        if (this.collectedBottles.length != 0) {
            this.collectedBottles.forEach((bottle) => {
                this.enemies.forEach((enemy) => {
                    if (bottle.isColliding(enemy)) {
                        let hittingBottle = bottle;
                        let hittedEnemy = enemy;
                        this.handleBottleHasHitEnemy(hittingBottle, hittedEnemy);
                    }
                })
            })
        }
    }

    /**
     * Handles a thrown bottle hitting an enemy.
     * Reduces enemy health, plays hit sound, and shatters the bottle.
     * @function
     * @param {ThrowableObject} hittingBottle - The bottle that hit
     * @param {MovableObject} enemy - The enemy that was hit
     * @returns {void}
     */
    handleBottleHasHitEnemy(hittingBottle, enemy) {
        enemy.hit();
        if (enemy instanceof Endboss) {
            this.statusBarBoss.setPercentage(enemy.energy)
        }
        hittingBottle.playSound(hittingBottle.hitBottleSound, 0.3)
        hittingBottle.shattered = true;
        setTimeout(() => {
            this.collectedBottles = [];
        }, 250);
    }

    /**
     * Checks for collisions between character and enemies.
     * Determines if character is jumping on enemy or taking damage.
     * @function
     * @returns {void}
     */
    collisionWithEnemy() {
        this.enemies.forEach((enemy) => {
            switch (true) {
                case (this.character.isColliding(enemy) && this.character.isJumpingOn(enemy)):
                    if (enemy instanceof Endboss) {
                        return
                    } else {
                        enemy.energy = 0;
                    }
                    return;
                case (this.character.isColliding(enemy) && !this.character.isJumpingOn(enemy)):
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                    return;
            }
        })
    }


    /**
     * Handles throwing a bottle when the throw key is pressed.
     * Creates a new throwable object and updates bottle inventory.
     * @function
     * @returns {void}
     */
    checkThrow() {
        if (this.keyboard.throw && this.bottleCounter > 0) {
            let bottle = new ThrowableObject(this.character.x + this.character.width - this.character.hitboxOffset.right - 10, this.character.y + (this.character.height * 0.5), this.character.otherDirection);
            this.collectedBottles.push(bottle);
            this.valueBottles -= 20;
            this.statusBarBottle.setPercentage(this.valueBottles);
            this.bottleCounter--;
            bottle.playSound(bottle.throwBottleSound, 0.3)
        }
    }

    /**
     * Plays the background music for the game world.
     * Sets volume, enables looping, and starts playback.
     * @function
     * @returns {void}
     */
    playWorldMusic() {
        this.backgroundMusic.volume = 0.01;
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();
    }

    /**
     * Switches the game to a game over or game won screen.
     * @function
     * @param {string} n - Screen type: "won" or "lost"
     * @returns {void}
     */
    switchToScreen(n) {
        if (n == "won") {
            this.switch = "won";
        }
        if (n == "lost") {
            this.switch = "lost";
        }
    }

    /**
     * Calculates distance to the endboss and triggers appropriate actions.
     * Triggers endboss behavior when character gets close enough.
     * @function
     * @returns {void}
     */
    distanceToEndboss() {
        let distance = this.endboss.x - this.character.x;
        if (distance <= 500) {
            this.endboss.triggered = true;
        }
        if (distance <= 300) {
            this.endboss.attack = true;
            setTimeout(() => {
                this.endboss.attack = false;
            }, 500);
        }
    }

    /**
     * Sets idle animation switches based on time since last player input.
     * Shows idle or long idle animations after keyboard inactivity.
     * @function
     * @returns {void}
     */
    setIdleSwitches() {
        let time = this.timePassed(lastInputTime);
        switch (true) {
            case time == 5.0:
                this.character.idle = true;
                this.character.longIdle = false;
                break;
            case time == 8.0:
                this.character.idle = false;
                this.character.longIdle = true;
                break;
            case time <= 4.0: this.character.idle = false;
                this.character.longIdle = false;
                break;
        }
    }

    /**
     * Calculates the time passed since a given timestamp in seconds.
     * @function
     * @param {number} n - Timestamp in milliseconds
     * @returns {number} - Time passed in seconds (fixed to 1 decimal place)
     */
    timePassed(n) {
        return ((Date.now() - n) / 1000).toFixed(1);
    }


    /**
     * Removes a collected item from the game world.
     * Removes coins or bottles from their respective arrays.
     * @function
     * @param {DrawableObject} element - The element to remove (Coin or Bottle)
     * @returns {void}
     */
    removeElementfromArray(element) {
        if (element instanceof Coin) {
            let position = this.coins.indexOf(element);
            this.coins.splice(position, 1);
        }
        if (element instanceof Bottle) {
            let position = this.collectibleBottle.indexOf(element);
            this.collectibleBottle.splice(position, 1);
        }
    }
};