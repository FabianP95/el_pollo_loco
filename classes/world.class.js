class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObejct('img/5_background/layers/air.png', 0),
        new BackgroundObejct('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObejct('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObejct('img/5_background/layers/1_first_layer/1.png', 0)

    ];
    canvas;
    ctx;
    keyboard;

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
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);

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