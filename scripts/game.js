let canvas = document.getElementById('canvas');
let world;
let canvasHeight = 480;
let canvasWidth = 720;
let standardFps = 1000 / 60;
let keyboard = new Keyboard();





function init() {
    world = new World(canvas , keyboard);
};


document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 37 && 65:
            keyboard.left = true;         
            break;
        case 38 && 87:
            keyboard.up = true;       
            break;
        case 39 && 68:
            keyboard.right = true;         
            break;
        case 40 && 83:
            keyboard.down = true;           
            break;
        case 32:
            keyboard.space = true;    
            break;
    }
});


document.addEventListener('keyup', (event) => {
    switch (event.keyCode) {
        case 37 && 65:
            keyboard.left = false;
            break;
        case 38 && 87:
            keyboard.up = false;
            break;
        case 39 && 68:
            keyboard.right = false;
            break;
        case 40 && 83:
            keyboard.down = false;
            break;
        case 32:
            keyboard.space = false;
            break;
    }
});