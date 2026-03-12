/**
 * GameOver class displays the game over screen when the player loses.
 * Extends DrawableObject to inherit drawing capability.
 * @class
 * @extends DrawableObject
 */
class GameEndScreen extends MovableObject {
    gameOver = ['img/9_intro_outro_screens/game_over/oh no you lost!.png', 'img/9_intro_outro_screens/game_over/oh no you lost!.png'];
    gameWon = ['img/You won, you lost/You won A.png','img/You won, you lost/You won A.png'];
    height = canvasHeight;
    width = canvasWidth;
    world;
    img;
    y = 0;
    x = 0;
    /**
     * Creates a new GameOver screen instance.
     * Loads the game over image.
     * @constructor
     */
    constructor() {
        super().loadImages(this.gameWon);
        this.loadImages(this.gameOver);
        this.stopAtLastImage(this.gameWon);
        this.animate()        
    }

    animate() {
        setInterval(() => {
            if (this.world.switch == "won") {
                this.stopAtLastImage(this.gameWon)
            }
            if (this.world.switch == "lost") {
               this.stopAtLastImage(this.gameOver)
            }
        }, 100);
    }


}