class MovableObject {
      x = 50;
      y = 90;
      imageCache = {};
      currentImage = 0;
      speed = 0.2;
      otherDirection = false;
      speedY = 0;
      acceleration = 2.5;


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

      applyGravity() {
            setInterval(() => {
                  if (this.isAboveGround() || this.speedY > 0) {
                        this.y -= this.speedY;
                        this.speedY -= this.acceleration;
                  }
            }, 1000 / 25);
      }

      isAboveGround() {
            return this.y < 190;
      }

      moveLeft() {
            this.x -= this.speed;
            
      }

      moveRight() {
            this.x += this.speed;
            
      }

      playWalkingAnimation(images) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
      }

      jump() {
            this.speedY = 30;
      }
}