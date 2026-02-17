const modal = document.getElementById('startDialog');

let gameStarted = false;

function startGame() {
    gameStarted = true;
    loadLevel();
    modal.classList.add('close-modal');
    initGame();

}