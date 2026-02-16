class StartScreen {
    startScreenImg = 'img/9_intro_outro_screens/start/startscreen_1.png';
    width = canvasWidth;
    height = canvasHeight;
    x = 0;
    y = 0;
    ctx;
    img;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.loadImg();
        this.showStartScreen();
    }

    showStartScreen() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawStartScreen();
        let self = this;
        requestAnimationFrame(() => {
            self.showStartScreen();
        });
    }

    drawStartScreen() {
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImg() {
        this.img = new Image();
        this.img.src = this.startScreenImg;
    }
}