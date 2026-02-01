class MovableObject {
      x = 50;
      y = 100;
      img;

      height = 50;
      width = 50;

      loadImg(path) {
            
            this.img = new Image(); //  <img id="character"> -> this.img = document.getElementById('character')
            this.img.src = path;
            
            
      }

      moveRight() {

      }

      moveLeft() {

      }
}