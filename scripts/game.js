let canvas = document.getElementById('canvas');
let world;
let start;
let canvasHeight = 480;
let canvasWidth = 1050;
let standardFps = 1000 / 60;
let keyboard = new Keyboard();
let lastInputTime = null;
let allowInput = true;
let btnLeft = document.getElementById('btnA');
let btnRight = document.getElementById('btnD');
let btnJump = document.getElementById('btnSpace');
let btnThrow = document.getElementById('btnG');

/**
 * Displays the start screen when the page loads.
 * Creates a new StartScreen instance and displays it on the canvas.
 * @function
 * @returns {void}
 */
function startScreen() {
    start = new StartScreen(canvas);
    checkMuteAtStart();
}


/**
 * Initializes the game world.
 * Creates a new World instance with the canvas and keyboard input handler.
 * @function
 * @returns {void}
 */
function initGame() {
    world = new World(canvas, keyboard);
};


/**
 * Handles keydown events for game controls.
 * Maps specific keyboard keys to their corresponding actions in the keyboard object.
 * Keys: A (left), D (right), W (up), S (down), Space (jump), G (throw).
 * @event
 * @param {KeyboardEvent} event - The keyboard event object
 * @returns {void}
 */
document.addEventListener('keydown', (event) => {
    lastInputTime = Date.now();
    if (allowInput) {
        switch (event.code) {
            case 'KeyA':
                addClasslist('btnA');
                keyboard.left = true;
                break;
            case 'KeyD':
                addClasslist('btnD');
                keyboard.right = true;
                break;
            case 'Space':
                addClasslist('btnSpace');
                keyboard.space = true;
                break;
            case 'KeyG':
                addClasslist('btnG');
                keyboard.throw = true;
                break;
        }
    }
});


/**
 * Handles keyup events for game controls.
 * Resets the corresponding keyboard action when a key is released.
 * @event
 * @param {KeyboardEvent} event - The keyboard event object
 * @returns {void}
 */
document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyA':
            removeClasslist('btnA');
            keyboard.left = false;
            break;
        case 'KeyD':
            removeClasslist('btnD');
            keyboard.right = false;
            break;
        case 'Space':
            removeClasslist('btnSpace');
            keyboard.space = false;
            break;
        case 'KeyG':
            removeClasslist('btnG');
            keyboard.throw = false;
            break;
    }
});


/**
 * Sets up touch event listeners for mobile game controls.
 * Enables touch input for left, right, jump, and throw buttons on mobile devices.
 */
function accessMobileBtns() {
    addEventListenerStartLeftAndRight(btnLeft, btnRight);
    addEventListenerEndLeftAndRight(btnLeft, btnRight);
    addEventListenerStartJumpAndAttack(btnJump, btnThrow);
    addEventListenerEndJumpAndAttack(btnJump, btnThrow);
}

/**
 * Adds touchstart event listeners for left and right movement buttons.
 * Sets keyboard.left and keyboard.right to true when buttons are touched.
 * @function
 * @param {HTMLElement} btn - The left button element
 * @param {HTMLElement} btn2 - The right button element
 */
function addEventListenerStartLeftAndRight(btn, btn2) {
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.left = true;
    })
    btn2.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.right = true;
    })
}

/**
 * Adds touchend event listeners for left and right movement buttons.
 * Sets keyboard.left and keyboard.right to false when buttons are released.
 * @function
 * @param {HTMLElement} btn - The left button element
 * @param {HTMLElement} btn2 - The right button element
 */
function addEventListenerEndLeftAndRight(btn, btn2) {
    btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.left = false;
    })
    btn2.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.right = false;
    })
}

/**
 * Adds touchstart event listeners for jump and attack buttons.
 * Sets keyboard.space and keyboard.throw to true when buttons are touched.
 * @function
 * @param {HTMLElement} btn - The jump button element
 * @param {HTMLElement} btn2 - The throw button element
 */
function addEventListenerStartJumpAndAttack(btn, btn2) {
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.space = true;
    })
    btn2.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.throw = true;
    })
}

/**
 * Adds touchend event listeners for jump and attack buttons.
 * Sets keyboard.space and keyboard.throw to false when buttons are released.
 * @function
 * @param {HTMLElement} btn - The jump button element
 * @param {HTMLElement} btn2 - The throw button element
 * @returns {void}
 */
function addEventListenerEndJumpAndAttack(btn, btn2) {
    btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.space = false;
    })
    btn2.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.throw = false;
    })
}