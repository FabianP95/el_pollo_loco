class World {
    
    character = new Character();
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
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
            this.ctx.save();
            this.ctx.translate(movableObj.width, 0);
            this.ctx.scale(-1, 1);
            movableObj.x = movableObj.x * -1;
        }
        this.ctx.drawImage(movableObj.img, movableObj.x, movableObj.y, movableObj.width, movableObj.height);
        if (movableObj.otherDirection) {
            movableObj.x = movableObj.x * -1;
            this.ctx.restore();

        }
    };
};