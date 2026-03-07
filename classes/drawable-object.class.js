/**
 * DrawableObject class serves as the base class for all objects that can be drawn on the canvas.
 * @class
 */
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

    /**
     * Loads a single image and assigns it to the img property.
     * @param {string} path - The path to the image file
     */
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Loads multiple images into the imageCache for animation purposes.
     * @param {string[]} arr - Array of image paths to load
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Draws the current image on the canvas at the object's position.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a hitbox around the object for debugging purposes.
     * Only draws hitbox for Character and Coin objects.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas
     */
    drawHitbox(ctx) {
        if (this instanceof Character || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.hitboxOffset.left, this.y + this.hitboxOffset.top, this.width - this.hitboxOffset.right, this.height - this.hitboxOffset.bottom);
            ctx.stroke();
        }
    }

    /**
     * Plays an animation by cycling through images from the provided array.
     * Increments the currentImage index to show the next frame.
     * @param {string[]} images - Array of image paths to cycle through
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Plays a sound with the specified volume level.
     * @param {Audio} sound - The audio object to play
     * @param {number} volume - Volume level (0.0 to 1.0)
     */
    playSound(sound, volume) {
        if (!muteSound) {
            sound.volume = volume;
            sound.play();
        }
    }

    /**
     * Updates and returns a bar index based on the current percentage.
     * Used to determine which status bar image to display.
     * @returns {number} - Bar index from 0 to 5 based on percentage ranges
     */
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