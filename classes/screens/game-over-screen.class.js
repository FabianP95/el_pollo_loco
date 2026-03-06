/**
 * GameOver class displays the game over screen when the player loses.
 * Extends DrawableObject to inherit drawing capability.
 * @class
 * @extends DrawableObject
 */
class GameEndScreen extends DrawableObject {
    gameOver = 'img/9_intro_outro_screens/game_over/oh no you lost!.png';
    gameWon = 'img/You won, you lost/You won A.png';
    height = canvasHeight;
    width = canvasWidth;
    world;
    y = 0;
    x = 0;
    /**
     * Creates a new GameOver screen instance.
     * Loads the game over image.
     * @constructor
     */
    constructor() {
        super().loadImg(this.gameWon);
        this.loadImg(this.gameOver);
        this.show()
    }

    show() {
        setInterval(() => {
              if (this.world.switch == "won") {
               this.loadImg(this.gameWon);
              }
              if (this.world.switch == "lost") {
                this.loadImg(this.gameOver);
              }
        }, 50);
        
    }
}