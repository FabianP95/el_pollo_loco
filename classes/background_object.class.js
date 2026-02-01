class BackgroundObejct extends MovableObject {
    width = 720;
    height = 400;
    constructor(imgPath, x) {
        super().loadImg(imgPath);
        this.y = canvasHeight -this.height;
        this.x = x;
    }
}