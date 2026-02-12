class MovableObject {
      x = 50;
      y = 90;
      imageCache = {};
      currentImage = 0;
      speed = 0.2;
      otherDirection = false;
      speedY = 0;
      acceleration = 2.5;
      hitboxOffset = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
      }

      lifepoints = 100;


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


      draw(ctx) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      }


      drawHitbox(ctx) {
            if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {


                  ctx.beginPath();
                  ctx.lineWidth = '1';
                  ctx.strokeStyle = 'blue';
                  ctx.rect(this.x, this.y, this.width, this.height);
                  ctx.stroke();

                  ctx.beginPath();
                  ctx.lineWidth = '1';
                  ctx.strokeStyle = 'red';
                  ctx.rect(this.x + this.hitboxOffset.left, this.y + this.hitboxOffset.bottom, this.width - this.hitboxOffset.right, this.height - this.hitboxOffset.top);
                  ctx.stroke();
            }
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

      isColliding(movableObj) {
            return this.x + this.width > movableObj.x &&
                  this.y + this.height > movableObj.y &&
                  this.x < movableObj.x &&
                  this.y < movableObj.y + movableObj.height
      }

      hit() {
            this.lifepoints -= 5;
            if (this.lifepoints < 0) {
                  this.lifepoints = 0;
            }
      }

      isDead() {
            return this.lifepoints == 0;
      }


}