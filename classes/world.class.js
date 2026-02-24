class World {

    character = new Character();
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    coins = level1.coins;
    collectibleBottle = level1.bottles;

    collectedCoins = [];
    collectedBottles = [];
    valueCoin = 20;
    valueBottles = 20;

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
        this.enemies[6].world = this;
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
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.translate(this.camera_x, 0);
                this.addObjectsToMap(this.backgroundObjects);
                this.addObjectsToMap(this.enemies);
                this.addObjectsToMap(this.clouds);
                this.addObjectsToMap(this.coins);
                this.addObjectsToMap(this.collectedBottles);
                this.addObjectsToMap(this.collectibleBottle);

                this.ctx.translate(-this.camera_x, 0);
                this.addToMap(this.statusBarHealth);
                this.addToMap(this.statusBarBottle);
                this.addToMap(this.statusBarCoin);
                this.addToMap(this.statusBarBoss);
                this.ctx.translate(this.camera_x, 0);

                this.addToMap(this.character);

                this.ctx.translate(-this.camera_x, 0);
            }
        }
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    };


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
        setInterval(() => {
            this.collisionWithEnemy();
            this.checkThrow();
            this.collisionThrow();
            this.collectingItems(this.coins, this.collectedCoins);
            this.collectingItems(this.collectibleBottle, this.collectedBottles);
            this.distanceToEndboss();
        }, 50);

    }

    collectingItems(collectible, collectedArr) {
        collectible.forEach((collected) => {
            if (this.character.isColliding(collected)) {
                if (collected instanceof Bottle) {
                    let bottle = new ThrowableObject();
                    collectedArr.push(bottle);
                    if (this.valueBottles >= 100) {
                        this.valueBottles = 100;
                    }
                    this.statusBarBottle.setPercentage(this.valueBottles);
                    this.valueBottles += 20;
                } else {
                    collectedArr.push(collected);
                    if (this.valueCoin >= 100) {
                        this.valueCoin = 100;
                    }
                    this.statusBarCoin.setPercentage(this.valueCoin);
                    this.valueCoin += 20;
                }
                collected.width = 0;
            }
        })
    }

    collisionThrow() {
        if (this.collectedBottles.length != 0) {
            this.collectedBottles.forEach((bottle) => {
                this.enemies.forEach((enemy) => {
                    if (bottle.isColliding(enemy)) {
                        enemy.hit();
                        bottle.shattered = true;
                        
                        
                    }
                })
            })
        }

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
        if (this.keyboard.throw) {
            let bottle = new ThrowableObject(this.character.x + this.character.width - this.character.hitboxOffset.right - 10, this.character.y + (this.character.height * 0.5), this.character.otherDirection);
            this.collectedBottles.push(bottle);
            console.log(bottle.shattered);
            
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
        let distance = this.enemies[6].x - this.character.x;
        if (distance <= 500) {
            this.enemies[6].triggered = true;
        }
        if (distance <= 300) {
             this.enemies[6].attack = true;
             setTimeout(() => {
                this.enemies[6].attack = false;
             }, 500);
        }
      
        
    }



};