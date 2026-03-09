const modal = document.getElementById('startDialog');

let gameStarted = false;
let muteSound;
let muteBtn = document.getElementById('muteBtn');
let gameArea = document.getElementById('gameArea');
let startBtn = document.getElementById('startBtn');
let endAnimationId;
let drawAnimation;
let gameOverTimeoutId = null;

/**
 * Initializes and starts the game.
 * Sets the gameStarted flag, loads the level, closes the start dialog modal, and initializes the game world.
 */
function startGame() {
    gameOverTimeoutId = null;
    muteSound = getMute();
    startBtn.innerText = 'Start the game';
    gameStarted = true;
    loadLevel();
    modal.classList.add('close-modal');
    initGame();
}

/**
 * Restarts the game after game over.
 * Shows the restart modal.
 * The button will call startGame() which handles full reinitialization.
 */
function openRestartGame() {
    if (gameOverTimeoutId !== null) {
        return;
    }
    muteSound = setMute(getMute());
    allowInput = true;
    gameOverTimeoutId = true;
    startBtn.innerText = 'Restart the game';
    gameStarted = false;
    modal.classList.remove('close-modal');
}

function addClasslist(id) {
    document.getElementById(id).classList.add('hover');
}

function removeClasslist(id) {
    document.getElementById(id).classList.remove('hover');
}

function setMute(isMuted) {
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
}

function getMute() {
    return JSON.parse(localStorage.getItem('isMuted')) ?? false;
}

function checkMuteAtStart() {
    muteSound = getMute();
    if (muteSound == true) {
        muteBtn.innerHTML = unmuteSVG();
    }
    if (muteSound == false) {
        muteBtn.innerHTML = muteSVG();
    }
}

function applyMute(isMuted) {
    muteSound = !isMuted;
    switch (true) {
        case !isMuted:
            muteBtn.innerHTML = unmuteSVG();
            break;
        case isMuted:
            muteBtn.innerHTML = muteSVG();
            break;
    }
    setMute(!isMuted);
}



