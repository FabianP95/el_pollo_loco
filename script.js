const modal = document.getElementById('startDialog');

let gameStarted = false;
let muteSound;
let muteBtn = document.getElementById('muteBtn');
let gameArea = document.getElementById('gameArea');
let startBtn = document.getElementById('startBtn');
let endAnimationId;
let drawAnimation;
let gameOverTimeoutId = null;
const overlay = document.getElementById('rotate-overlay');
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

/**
 * Adds a 'hover' CSS class to the element with the specified ID.
 * @param {string} id - The ID of the element to add the class to.
 */
function addClasslist(id) {
    document.getElementById(id).classList.add('hover');
}

/**
 * Removes the 'hover' CSS class from the element with the specified ID.
 * @param {string} id - The ID of the element to remove the class from.
 */
function removeClasslist(id) {
    document.getElementById(id).classList.remove('hover');
}

/**
 * Stores the mute state in localStorage.
 * @param {boolean} isMuted - Whether the game is muted or not.
 * @returns {boolean} The mute state that was saved.
 */
function setMute(isMuted) {
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
}

/**
 * Retrieves the mute state from localStorage.
 * @returns {boolean} The stored mute state, or false if not previously set.
 */
function getMute() {
    return JSON.parse(localStorage.getItem('isMuted')) ?? false;
}

/**
 * Checks and applies the mute state at startup.
 * Updates the mute button's display based on the saved mute state.
 */
function checkMuteAtStart() {
    muteSound = getMute();
    if (muteSound == true) {
        muteBtn.innerHTML = unmuteSVG();
    }
    if (muteSound == false) {
        muteBtn.innerHTML = muteSVG();
    }
}

/**
 * Toggles the mute state and updates the mute button display.
 * @param {boolean} isMuted - The current mute state to toggle.
 */
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

/**
 * Detects if the device is a mobile device.
 * @returns {boolean} True if the device is a mobile device, false otherwise.
 */
function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || (navigator.userAgentData?.mobile === true);
}

/**
 * Checks and applies the device orientation.
 * Shows the rotation overlay on mobile devices when in portrait orientation.
 */
function checkOrientation() {
    if (!isMobileDevice()) return;
    const isPortrait = window.matchMedia('(orientation: portrait)').matches;
    overlay.classList.toggle('active', isPortrait);
}

// Check on load and on every resize/orientation change
checkOrientation();
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);



