let canvas = document.getElementById('canvas');
let world;
let start;
let canvasHeight = 480;
let canvasWidth = 1050;
let standardFps = 1000 / 60;
let keyboard = new Keyboard();
let lastInputTime = null;
let allowInput = true;



/**
 * Displays the start screen when the page loads.
 * Creates a new StartScreen instance and displays it on the canvas.
 * @function
 * @returns {void}
 */
function startScreen() {
    start = new StartScreen(canvas);
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
    if (allowInput) {
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
    }
});