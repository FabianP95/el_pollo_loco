const modal = document.getElementById('startDialog');

let gameStarted = false;

/**
 * Initializes and starts the game.
 * Sets the gameStarted flag, loads the level, closes the start dialog modal, and initializes the game world.
 */
function startGame() {
    gameStarted = true;
    loadLevel();
    modal.classList.add('close-modal');
    initGame();

}