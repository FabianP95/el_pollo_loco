class MovableObject {
      x = 200;
      y = 250;
      img;

      height = 150;
      width = 100;

      loadImg(path) {
            this.img = new Image(); //  <img id="character"> -> this.img = document.getElementById('character')
            this.img.src = path;
      }

      moveRight() {

      }

      moveLeft() {

      }
}