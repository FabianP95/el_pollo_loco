class DrawableObject {
    imageCache = {};
    x = 50;
    y = 90;
    height;
    width;
    currentImage = 0;
    img;
    hitboxOffset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

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
        if (this instanceof Character || this instanceof Chicken /* || this instanceof Endboss || this instanceof Coin || this instanceof Bottle || this instanceof LittleChicken */) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'green';
            ctx.moveTo(this.x + this.hitboxOffset.left, this.y + this.height - 10)
            ctx.lineTo(this.x  + this.width - this.hitboxOffset.right, this.y + this.height - 10);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.moveTo(this.x + this.hitboxOffset.left, this.y + this.height - 10)
            ctx.lineTo(this.x  + this.width - this.hitboxOffset.right, this.y + this.height - 10);
            ctx.stroke();

           /*  ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.hitboxOffset.left, this.y + this.hitboxOffset.top, this.width - this.hitboxOffset.right, this.height - this.hitboxOffset.bottom);
            ctx.stroke(); */
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}