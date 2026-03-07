const modal = document.getElementById('startDialog');

let gameStarted = false;
let muteSound = false;
let muteBtn = document.getElementById('muteBtn');

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

function addClasslist(id) {
    document.getElementById(id).classList.add('hover');
}

function removeClasslist(id) {
    document.getElementById(id).classList.remove('hover');
}

function setScreen() {

}

function setMute(isMuted) {
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
    applyMute(isMuted);
}

function getMute() {
    return JSON.parse(localStorage.getItem('isMuted')) ?? false;
}

function applyMute(isMuted) {
    switch (true) {
        case isMuted: muteSound = !muteSound;
            muteBtn.innerText = 'Mute sound';
            return
        case !isMuted: muteSound = !muteSound;
            muteBtn.innerText = 'Unmute sound';
            return
    }
}

