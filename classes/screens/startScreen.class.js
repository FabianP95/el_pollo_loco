/**
 * StartScreen class displays the game start screen.
 * @class
 */
class StartScreen {
    startScreenImg = 'img/9_intro_outro_screens/start/startscreen_1.png';
    width = canvasWidth;
    height = canvasHeight;
    x = 0;
    y = 0;
    ctx;
    img;

    /**
     * Creates a new StartScreen instance.
     * Initializes the canvas context and starts displaying the start screen.
     * @constructor
     * @param {HTMLCanvasElement} canvas - The canvas to draw the start screen on
     */
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.loadImg();
        this.showStartScreen();
    }

    /**
     * Continuously displays the start screen using animation frames.
     */
    showStartScreen() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawStartScreen();
        let self = this;
        requestAnimationFrame(() => {
            self.showStartScreen();
        });
    }

    /**
     * Draws the start screen image on the canvas.
     */
    drawStartScreen() {
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads the start screen image into memory.
     */
    loadImg() {
        this.img = new Image();
        this.img.src = this.startScreenImg;
    }
}