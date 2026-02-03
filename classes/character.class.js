class Character extends MovableObject {
    x = 0;
    height = 250;
    width = 150;
    world;
    walkingImg = ['../img/2_character_pepe/2_walk/W-21.png', '../img/2_character_pepe/2_walk/W-22.png', '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png', '../img/2_character_pepe/2_walk/W-25.png', '../img/2_character_pepe/2_walk/W-26.png'
    ];


    constructor() {
        super().loadImg('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.walkingImg);
        this.animate();
    }

    animate() {
    
            setInterval(() => {
                let i = this.currentImage % this.walkingImg.length;
                let path = this.walkingImg[i];
                this.img = this.imageCache[path];
                this.currentImage++;
                
            }, 150)
        
    }


    jump() {
    }

}