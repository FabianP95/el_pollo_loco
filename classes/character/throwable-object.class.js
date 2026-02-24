class ThrowableObject extends MovableObject {
    shattered = false

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

    damage = 50;

    hitBottleSound = new Audio('../assets/audio/items/bottle-hit.mp3');
    throwBottleSound = new Audio('../assets/audio/items/bottle-throw.mp3');



    constructor(x, y, direction) {
        super().loadImages(this.rotationImg);
        this.loadImages(this.splashImg);
        this.loadImg(this.bottleImg[0]);
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.width = 75;
        this.height = 75;
        this.throw(x, y, direction);


    }

    throw() {
        if (this.direction) {
            this.speedY = 20;
            this.x = this.x - 70;
            setInterval(() => {
                this.x -= 15;
            }, 25)
        } else {
            this.speedY = 20;
            setInterval(() => {
                this.x += 15;
            }, 25)
        }
        this.applyGravity();
        this.animate();

    }

    animate() {
        setInterval(() => {
             switch (true) {
            case this.shattered:
                this.animateDeath(this.splashImg);
                this.x = this.x
                setTimeout(() => {
                    /* this.width = 0; */
                    console.log('yay');
                    
                }, 1000);
                break;
        
            default:this.playAnimation(this.rotationImg);
                break;
        }
        }, 50)
    }
}