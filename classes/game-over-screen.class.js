class GameOver extends DrawableObject {
    gameOver = 'img/9_intro_outro_screens/game_over/oh no you lost!.png';
    height = canvasHeight;
    width = canvasWidth;
    y = 0;
    x = 0;
    constructor(){
        super().loadImg(this.gameOver);
    }
}