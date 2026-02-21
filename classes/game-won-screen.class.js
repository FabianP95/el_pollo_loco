class GameWon extends DrawableObject {
    gameWon = 'img/You won, you lost/You won A.png';
    height = canvasHeight;
    width = canvasWidth;
    y = 0;
    x = 0;
    constructor(){
        super().loadImg(this.gameWon);
    }
}