class MovableObject {
      x = 50;
      y = 190;
      imageCache = {};
      currentImage = 0;
      speed = 0.2;
      otherDirection = false;

      loadImg(path) {
            this.img = new Image(); //  <img id="character"> -> this.img = document.getElementById('character')
            this.img.src = path;
      }

      loadImages(arr) {
            arr.forEach((path) => {
                  let img = new Image();
                  img.src = path;
                  this.imageCache[path] = img;
            });
      }



      moveRight() {

      }

      moveLeft(){
        setInterval(()=>{
            this.x -= this.speed;
        }, standardFps) 
    }
}