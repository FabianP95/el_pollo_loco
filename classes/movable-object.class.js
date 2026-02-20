class MovableObject extends DrawableObject {

      speed = 0.2;
      otherDirection = false;
      speedY = 0;
      acceleration = 2.5;
      energy = 100;
      lastHit = 0;
      
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
            this.jumpSound.play();
      }

      isColliding(movableObj) {
            return this.x + this.width > movableObj.x &&
                  this.y + this.height > movableObj.y &&
                  this.x < movableObj.x &&
                  this.y < movableObj.y + movableObj.height
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
            let timePassed = new Date().getTime() - this.lastHit; // difference in ms, get time measures ms from the date 1.1.1970 till now
            timePassed = timePassed / 1000; // in sec
            return timePassed < 0.3;
      }


}