/**
 * GameOver class displays the game over screen when the player loses.
 * Extends DrawableObject to inherit drawing capability.
 * @class
 * @extends DrawableObject
 */
class GameOver extends DrawableObject {
    gameOver = 'img/9_intro_outro_screens/game_over/oh no you lost!.png';
    height = canvasHeight;
    width = canvasWidth;
    y = 0;
    x = 0;
    /**
     * Creates a new GameOver screen instance.
     * Loads the game over image.
     * @constructor
     */
    constructor() {
        super().loadImg(this.gameOver);
    }
}