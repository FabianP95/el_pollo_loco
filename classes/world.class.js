class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];

    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.draw(); 
    }

    draw() {
        console.log(1);
        
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.height, this.character.width); 
    };

    paint(){}
}