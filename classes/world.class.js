class World {

    character = new Character();
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    coins = level1.coins;
    collectibleBottle = level1.bottles;

    bottles = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    statusBarHealth = new StatusbarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    backgroundMusic = new Audio('assets/audio/world/background-music.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.runChecks();
        this.playWorldMusic();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.collectibleBottle);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

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
        }, 50);
    }

    collisionWithEnemy() {
        this.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        })
    }

    checkThrow() {
        if (this.keyboard.throw) {
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.bottles.push(bottle);
        }

    }

    playWorldMusic(){
        this.backgroundMusic.volume = 0.05;
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();
    }




};