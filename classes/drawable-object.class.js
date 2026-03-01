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
        this.img = new Image();
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
        if (this instanceof Character || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.hitboxOffset.left, this.y + this.hitboxOffset.top, this.width - this.hitboxOffset.right, this.height - this.hitboxOffset.bottom);
            ctx.stroke();
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    playSound(sound, volume) {
        sound.volume = volume;
        sound.play();
    }

    updateBar() {
        switch (true) {
            case (this.percentage > 80 && this.percentage <= 100):
                return 5;
            case (this.percentage > 60 && this.percentage <= 80):
                return 4;
            case (this.percentage > 40 && this.percentage <= 60):
                return 3;
            case (this.percentage > 20 && this.percentage <= 40):
                return 2;
            case (this.percentage > 0 && this.percentage <= 20):
                return 1;
            case (this.percentage == 0):
                return 0;
        }
    }
}