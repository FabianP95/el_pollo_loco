/**
 * MovableObject class extends DrawableObject and adds physics and movement capabilities.
 * Handles gravity, collision detection, and object states like jumping and taking damage.
 * @class
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {

      /** @type {number} - Speed of horizontal movement */
      speed = 0.2;
      /** @type {boolean} - Whether object is facing the opposite direction */
      otherDirection = false;
      /** @type {number} - Vertical speed for gravity calculations */
      speedY = 0;
      /** @type {number} - Gravity acceleration value */
      acceleration = 2.5;
      /** @type {number} - Energy/health value (0-100) */
      energy = 50;
      /** @type {number} - Timestamp of the last hit taken */
      lastHit = 0;
      /** @type {boolean} - Whether death sound has been played */
      hasPlayed = false;

      /**
       * Applies gravity effect to the object.
       * Continuously updates vertical position and speed based on gravity.
       * @function
       * @returns {void}
       */
      applyGravity() {
            setInterval(() => {
                  if (this.isAboveGround() || this.speedY > 0) {
                        this.y -= this.speedY;
                        this.speedY -= this.acceleration;
                  }
            }, 1000 / 25);
      }


      /**
       * Checks if the object is above ground level.
       * For throwable objects, always returns true. For others, checks if y < 190.
       * @function
       * @returns {boolean} - True if object is above ground, false otherwise
       */
      isAboveGround() {
            if (this instanceof ThrowableObject) {
                  return true
            } else {
                  return this.y < 190;
            }
      }

      /**
       * Moves the object to the left by decreasing its x position.
       * @function
       * @returns {void}
       */
      moveLeft() {
            this.x -= this.speed;
      }

      /**
       * Moves the object to the right by increasing its x position.
       * @function
       * @returns {void}
       */
      moveRight() {
            this.x += this.speed;
      }

      /**
       * Makes the object jump by setting initial upward vertical speed.
       * @function
       * @returns {void}
       */
      jump() {
            this.speedY = 30;
      }

      /**
       * Checks if this object is colliding with another movable object.
       * Uses hitbox offsets for accurate collision detection.
       * @function
       * @param {MovableObject} movableObj - The object to check collision with
       * @returns {boolean} - True if objects are colliding, false otherwise
       */
      isColliding(movableObj) {
            if (movableObj.energy == 0) {
                  return false;
            }
            return this.x + this.width - this.hitboxOffset.right > movableObj.x + movableObj.hitboxOffset.left &&
                  this.x < movableObj.x + movableObj.width - movableObj.hitboxOffset.right &&
                  this.y + this.height > movableObj.y &&
                  this.y + this.hitboxOffset.top < movableObj.y + movableObj.height
      }

      /**
       * Checks if this object is jumping on top of another object.
       * Does not apply to Endboss. Checks if this object is above and moving downward.
       * @function
       * @param {MovableObject} movableObj - The object being jumped on
       * @returns {boolean} - True if jumping on the object, false otherwise
       */
      isJumpingOn(movableObj) {
            if (movableObj instanceof Endboss) {
                  return
            }
            return this.y + this.height < movableObj.y + movableObj.height &&
                  this.speedY < 0;
      }

      /**
       * Reduces object energy by 5 when hit.
       * Records the time of the hit and ensures energy doesn't go below 0.
       * @function
       * @returns {void}
       */
      hit() {
            this.energy -= 5;
            if (this.energy < 0) {
                  this.energy = 0;
            } else {
                  this.lastHit = new Date().getTime();
            }
      }

      /**
       * Checks if the object is dead (energy = 0).
       * @function
       * @returns {boolean} - True if energy is 0, false otherwise
       */
      isDead() {
            return this.energy == 0;
      }

      /**
       * Checks if the object was recently hit (within the last 0.1 seconds).
       * @function
       * @returns {boolean} - True if hit recently, false otherwise
       */
      isHit() {
            let timePassed = new Date().getTime() - this.lastHit;
            timePassed = timePassed / 1000;
            return timePassed < 0.1;
      }

      /**
       * Moves the object down by 1 pixel (visual effect of sinking into ground).
       * @function
       * @returns {void}
       */
      goUnderground() {
            this.y += 1;
      }


      /**
       * Stops animation at the last frame without looping.
       * Displays frames sequentially until the last one, then stays on it.
       * @function
       * @param {string[]} images - Array of image paths for the animation
       * @returns {void}
       */
      stopAtLastImage(images) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage >= images.length) {
                  this.currentImage = images.length - 1;
            }
      }

      /**
       * Handles movement logic for small enemies (chickens).
       * If dead, moves underground; otherwise moves left.
       * @function
       * @returns {void}
       */
      handleLittleEnemiesMovement() {
            if (this.isDead()) {
                  this.goUnderground()
            } else {
                  this.moveLeft();
            }
      }

      /**
       * Handles animation for small enemies (chickens).
       * Shows death animation if dead, otherwise shows walking animation.
       * @function
       * @returns {void}
       */
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