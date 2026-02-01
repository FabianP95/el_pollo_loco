class MovableObject {
      x = 50;
      y = 410;
      img;

      height = 70;
      width = 70;

      loadImg(path) {
            
            this.img = new Image(); //  <img id="character"> -> this.img = document.getElementById('character')
            this.img.src = path;
            
            
      }

      moveRight() {

      }

      moveLeft() {

      }
}