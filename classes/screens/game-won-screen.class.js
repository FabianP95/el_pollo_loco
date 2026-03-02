/**
 * GameWon class displays the victory screen when the player wins.
 * Extends DrawableObject to inherit drawing capability.
 * @class
 * @extends DrawableObject
 */
class GameWon extends DrawableObject {
    gameWon = 'img/You won, you lost/You won A.png';
    height = canvasHeight;
    width = canvasWidth;
    y = 0;
    x = 0;
    /**
     * Creates a new GameWon screen instance.
     * Loads the game won image.
     * @constructor
     */
    constructor() {
        super().loadImg(this.gameWon);
    }
}