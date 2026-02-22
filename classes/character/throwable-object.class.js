class ThrowableObject extends MovableObject {
    rotationImg = ['img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    splashImg = ['img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    bottleImg = ['img/6_salsa_bottle/salsa_bottle.png'];

    hitboxOffset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    };

    constructor(x, y) {
        super().loadImages(this.rotationImg);
        this.loadImages(this.splashImg);
        this.loadImg(this.bottleImg[0]);
        this.x = x;
        this.y = y;
        this.width = 75;
        this.height = 75;
        this.throw(x, y);
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.animate();
        setInterval(() => {
            this.x += 10;
        }, 25)
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.rotationImg);
        }, 50)
    }
}