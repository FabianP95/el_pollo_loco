const modal = document.getElementById('startDialog');

let gameStarted = false;
let muteSound;
let muteBtn = document.getElementById('muteBtn');
let screenBtn = document.getElementById('screenBtn');

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

function setScreen() {
    switch (true) {
        case canvasHeight == 480:
            canvas.style.height = '720px';
            canvasHeight = 720;
            screenBtn.innerHTML = goFullscreen();
            break;
        case canvasHeight >= 720:
            canvas.style.height = '480px';
            canvasHeight = 480;
            screenBtn.innerHTML = goSmallScreen();
            break;
    }
}

