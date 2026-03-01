class MovableObject extends DrawableObject {

      speed = 0.2;
      otherDirection = false;
      speedY = 0;
      acceleration = 2.5;
      energy = 50;
      lastHit = 0;
      hasPlayed = false;

      applyGravity() {
            setInterval(() => {
                  if (this.isAboveGround() || this.speedY > 0) {
                        this.y -= this.speedY;
                        this.speedY -= this.acceleration;
                  }
            }, 1000 / 25);
      }


      isAboveGround() {
            if (this instanceof ThrowableObject) {
                  return true
            } else {
                  return this.y < 190;
            }
      }

      moveLeft() {
            this.x -= this.speed;
      }

      moveRight() {
            this.x += this.speed;
      }

      jump() {
            this.speedY = 30;
      }

      isColliding(movableObj) {
            if (movableObj.energy == 0) {
                  return false;
            }
            return this.x + this.width - this.hitboxOffset.right > movableObj.x + movableObj.hitboxOffset.left &&
                  this.x < movableObj.x + movableObj.width - movableObj.hitboxOffset.right &&
                  this.y + this.height > movableObj.y &&
                  this.y + this.hitboxOffset.top < movableObj.y + movableObj.height
      }

      isJumpingOn(movableObj) {
            if (movableObj instanceof Endboss) {
                  return
            }
            return this.y + this.height < movableObj.y + movableObj.height &&
                  this.speedY < 0;
      }

      hit() {
            this.energy -= 5;
            if (this.energy < 0) {
                  this.energy = 0;
            } else {
                  this.lastHit = new Date().getTime();
            }
      }

      isDead() {
            return this.energy == 0;
      }

      isHit() {
            let timePassed = new Date().getTime() - this.lastHit;
            timePassed = timePassed / 1000;
            return timePassed < 0.1;
      }

      goUnderground() {
            this.y += 1;
      }


      stopAtLastImage(images) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage >= images.length) {
                  this.currentImage = images.length - 1;
            }
      }

      handleLittleEnemiesMovement() {
            if (this.isDead()) {
                  this.goUnderground()
            } else {
                  this.moveLeft();
            }
      }

      handleLittleEnemiesAnimation() {
            if (this.isDead()) {
                  this.stopAtLastImage(this.deadImg);
                  if (!this.hasPlayed) {
                        this.playSound(this.deadSound, 0.15);
                        this.hasPlayed = true;
                  }
            } else {
                  this.playAnimation(this.walkingImg);
            }
      }
}