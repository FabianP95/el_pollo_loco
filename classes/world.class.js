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


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.runChecks();
        /* this.playWorldMusic(); */
    }

    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
        this.endboss.statusBarBossHealth = this.statusBarBoss;
    }

    drawGameOver() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.gameEnd);
        let self = this;
        requestAnimationFrame(() => {
            self.drawGameOver();
        });
    }

    drawGameWon() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.gameWon);
        let self = this;
        requestAnimationFrame(() => {
            self.drawGameWon();
        });
    }

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

    addCollectiblesToMap() {
        this.addObjectsToMap(this.collectibleBottle);
        this.addObjectsToMap(this.collectedBottles);
        this.addObjectsToMap(this.coins);
    }

    addStatusBarsToMap() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    };

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

    flipImg(movableObj) {
        this.ctx.save();
        this.ctx.translate(movableObj.width, 0);
        this.ctx.scale(-1, 1);
        movableObj.x = movableObj.x * -1;
    }


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

    runDamageChecks() {
        setInterval(() => {
            this.distanceToEndboss();
            this.collisionThrow();
            this.collisionWithEnemy();
        }, 50);
    }

    runCollectingChecks() {
        setInterval(() => {
            this.collectingItems(this.coins, this.collectedCoins);
            this.collectingItems(this.collectibleBottle, this.collectedBottles);
        }, 50);
    }

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

    handleCollectedBottle(collected) {
        this.valueBottles += 20;
        this.bottleCounter++;
        this.statusBarBottle.setPercentage(this.valueBottles);
        collected.playSound(collected.collectBottleSound, 0.4)
    }

    handleCollectedCoin(collected) {
        if (this.valueCoin >= 100) {
            this.valueCoin = 100;
        }
        this.valueCoin += 20;
        this.statusBarCoin.setPercentage(this.valueCoin);
        collected.playSound(collected.collectCoinSound, 0.4)
    }

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

    playWorldMusic() {
        this.backgroundMusic.volume = 0.01;
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();
    }

    switchToScreen(n) {
        if (n == "won") {
            this.switch = "won";
        }
        if (n == "lost") {
            this.switch = "lost";
        }
    }

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

    timePassed(n) {
        return ((Date.now() - n) / 1000).toFixed(1);
    }


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