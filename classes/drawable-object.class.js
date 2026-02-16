class DrawableObject {
    imageCache = {};
    x = 50;
    y = 90;
    height;
    width;
    currentImage = 0;
    img;

    loadImg(path) {
        this.img = new Image(); //  <img id="character"> -> this.img = document.getElementById('character')
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawHitbox(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'green';
            ctx.moveTo(0,431)
            ctx.lineTo(1420, 431);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.hitboxOffset.left, this.y + this.hitboxOffset.bottom, this.width - this.hitboxOffset.right, this.height - this.hitboxOffset.top);
            ctx.stroke();
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}