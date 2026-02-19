let canvas = document.getElementById('canvas');
let world;
let start;
let canvasHeight = 480;
let canvasWidth = 720;
let standardFps = 1000 / 60;
let keyboard = new Keyboard();




function startScreen() {
     start = new StartScreen(canvas);
}


function initGame() {
    world = new World(canvas, keyboard);
};


document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyA':
            keyboard.left = true;
            break;
        case 'KeyW':
            keyboard.up = true;
            break;
        case 'KeyD':
            keyboard.right = true;
            break;
        case 'KeyS':
            keyboard.down = true;
            break;
        case 'Space':
            keyboard.space = true;
            break;
        case 'KeyG':
            keyboard.throw = true;
            break;
    }
});


document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyA':
            keyboard.left = false;
            break;
        case 'KeyW':
            keyboard.up = false;
            break;
        case 'KeyD':
            keyboard.right = false;
            break;
        case 'KeyS':
            keyboard.down = false;
            break;
        case 'Space':
            keyboard.space = false;
            break;
        case 'KeyG':
            keyboard.throw = false;
            break;
    }
});