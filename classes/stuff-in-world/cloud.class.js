class Cloud extends MovableObject {
    y = 0;
    height = 250;
    width = 250;
    constructor() {
        super().loadImg('img/5_background/layers/4_clouds/1.png');
         this.x = Math.random()*200;
         console.log(Math.floor(Math.random() * 1000));
         
   
         
         setInterval(() => {
            this.moveLeft();
        }, standardFps);
    }

    
}