let canvas = document.getElementById('canvas');
let world;
let canvasHeight = 480;
let canvasWidth = 720;
let standardFps = 1000/60;





function init() {
    world = new World(canvas);
}
