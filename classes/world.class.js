class World {
    character = new Character();
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    coins = level1.coins;
    collectibleBottle = level1.bottles;
    endboss;
    collectedCoins = [];
    collectedBottles = [];
    bottleCounter = 0;
    valueCoin = 0;
    valueBottles = 0;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    switch = "world";
    statusBarHealth = new StatusbarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    statusBarBoss = new StatusBarBoss();
    backgroundMusic = new Audio('assets/audio/world/background-music.mp3');
    gameEnd = new GameEndScreen();

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
    }

    /**
     * Sets up world references for character and boss.
     * Connects game objects to the world instance for game logic.
     */
    setWorld() {
        this.endboss = this.enemies.find(enemy => enemy instanceof Endboss);
        this.character.world = this;
        this.endboss.world = this;
        this.endboss.statusBarBossHealth = this.statusBarBoss;
        this.gameEnd.world = this;
    }

    /**
     * Draws the game end screen.
     * Displays background and victory or losing screen overlay in continuous loop.
     */
    drawEndscreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.gameEnd);
        let self = this;
        endAnimationId = requestAnimationFrame(() => {
            self.drawEndscreen();
        });

    }

    /**
     * Main draw loop that renders the game or end screens.
     * Checks game state and calls appropriate drawing method.
     * Runs continuously using requestAnimationFrame.
     */
    draw() {
        switch (true) {
            case this.switch == "won":
                this.drawEndscreen();
                break;
            case this.switch == "lost":
                this.drawEndscreen();
                break;
            case this.switch == "world":
                this.addWholeWorld();
                break;
        }
        this.playWorldMusic();
        let self = this;
        drawAnimation = requestAnimationFrame(() => {
            self.draw();
        });
    };

    /**
     * Renders all game objects in the correct order.
     * Handles camera translation and layers (backgrounds, enemies, collectibles, character, UI).
     */
    addWholeWorld() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addCollectiblesToMap();
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.statusBarBoss);
        this.ctx.translate(-this.camera_x, 0);
        this.addStatusBarsToMap();
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Adds all collectible items (bottles and coins) to the map for drawing.
     */
    addCollectiblesToMap() {
        this.addObjectsToMap(this.collectibleBottle);
        this.addObjectsToMap(this.collectedBottles);
        this.addObjectsToMap(this.coins);
    }

    /**
     * Adds all status bars to the canvas.
     * Includes health, bottle, coin, and boss health bars.
     */
    addStatusBarsToMap() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
    }

    /**
     * Adds multiple objects to the map for drawing.
     * Iterates through an array of objects and draws each one.
     * @param {DrawableObject[]} objects - Array of objects to draw
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    };

    /**
     * Adds a single object to the map for drawing.
     * Handles image flipping if object is facing the opposite direction.
     * @param {DrawableObject} movableObj - Object to draw
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
     * @param {DrawableObject} movableObj - Object to flip
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
     * @param {DrawableObject} movableObj - Object that was flipped
     */
    flipImgBack(movableObj) {
        movableObj.x = movableObj.x * -1;
        this.ctx.restore();
    }

    /**
     * Runs checks on events happening in the world.
     */
    runChecks() {
        this.runDamageChecks();
        this.runCollectingChecks();
        setInterval(() => {
            this.checkThrow();
            this.character.setIdleSwitches();
        }, 100);
    }

    /**
     * Runs damage-related checks.
     * Checks for collisions with enemies and throws, and triggers endboss actions.
     */
    runDamageChecks() {
        setInterval(() => {
            if (!this.endboss.isDead()) {
                this.distanceToEndboss();
                this.collisionThrow();
                this.collisionWithEnemy();
            }
        }, 50);
    }

    /**
     * Runs collecting-related checks.
     * Checks if character collects coins or bottles.
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
     * @param {DrawableObject[]} collectible - Array of items that can be collected
     * @param {DrawableObject[]} collectedArr - Array to store collected items
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
     * @param {Bottle} collected - The bottle that was collected
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
     * @param {Coin} collected - The coin that was collected
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
     * @param {ThrowableObject} hittingBottle - The bottle that hit
     * @param {MovableObject} enemy - The enemy that was hit
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
     */
    checkThrow() {
        if (this.keyboard.throw && this.bottleCounter > 0 && !this.character.isDead()) {
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
     */
    playWorldMusic() {
        if (!muteSound) {
            this.backgroundMusic.volume = 0.02;
            this.backgroundMusic.loop = true;
            this.backgroundMusic.play();
        } else {
            this.backgroundMusic.pause();
            this.backgroundMusic.currentTime = 0;
        }
    }

    /**
     * Switches the game to a game over or game won screen.
     * @param {string} n - Screen type: "won" or "lost"
     */
    switchToScreen(n) {
        if (n == "won") {
            this.switch = "won";
        }
        if (n == "lost") {
            this.switch = "lost";
        }
        allowInput = false;
        setTimeout(() => {
            openRestartGame();
        }, 200);
    }

    /**
     * Calculates distance to the endboss and triggers appropriate actions.
     * Triggers endboss behavior when character gets close enough.
     */
    distanceToEndboss() {
        let distance = this.endboss.x - this.character.x;
        if (distance >= 500) {
            this.endboss.triggered = false;
        }
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
     * Calculates the time passed since a given timestamp in seconds.
     * @param {number} n - Timestamp in milliseconds
     * @returns {number} - Time passed in seconds (fixed to 1 decimal place)
     */
    timePassed(n) {
        return ((Date.now() - n) / 1000).toFixed(1);
    }

    /**
     * Removes a collected item from the game world.
     * Removes coins or bottles from their respective arrays.
     * @param {DrawableObject} element - The element to remove (Coin or Bottle)
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