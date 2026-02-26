class Endboss extends MovableObject {
    height = 400;
    width = 250;
    world;
    walking = "forward";
    triggered = false;
    attack = false;

    alertImg = ['img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];


    walkingImg = ['img/4_enemie_boss_chicken/1_walk/G1.png', 'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png', 'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    attackImg = ['img/4_enemie_boss_chicken/3_attack/G13.png', 'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png', 'img/4_enemie_boss_chicken/3_attack/G16.png', 'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png', 'img/4_enemie_boss_chicken/3_attack/G19.png', 'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    hurtImg = ['img/4_enemie_boss_chicken/4_hurt/G21.png', 'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    deadImg = ['img/4_enemie_boss_chicken/5_dead/G24.png', 'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    hitboxOffset = {
        top: 55,
        bottom: 65,
        left: 5,
        right: 10
    }

    introSound = new Audio('../assets/audio/enemies/boss/boss-intro.mp3');
    hitSound = new Audio('../assets/audio/enemies/boss/boss-hit.wav');
    deadSound = new Audio('../assets/audio/enemies/boss/boss-dead.mp3');

    constructor() {
        super().loadImg(this.walkingImg[0]);
        this.loadImages(this.alertImg);
        this.loadImages(this.walkingImg);
        this.loadImages(this.hurtImg);
        this.loadImages(this.attackImg);
        this.loadImages(this.deadImg);
        this.energy = 100;
        this.speed = 30;
        this.x = 2050;
        this.y = canvasHeight - 30 - this.height;
        this.animate()
    }

    animate() {
        setInterval(() => {
            switch (true) {
                case this.attack:
                    this.x -= 40;
                    this.playAnimation(this.attackImg);
                    break;
                case this.isHit():
                    this.otherDirection = false;
                    this.playAnimation(this.hurtImg);
                    break;
                case this.isDead():
                    this.animateDeath(this.deadImg);
                    if (!this.hasPlayed) {
                        this.playSound(this.deadSound, 0.15);
                        this.hasPlayed = true;
                    }
                    this.goUnderground();
                    setTimeout(() => {
                        this.world.switchToScreen("won");
                    }, 1000);
                    break;
                case this.triggered:
                    this.otherDirection = false;
                    this.playAnimation(this.alertImg);
                    break;
                default:
                    this.playAnimation(this.walkingImg);
                    this.walkingAround();
                    break;
            }
        }, 150)
    }
    

    walkingAround() {
        this.setWalkingSwitch();
        switch (this.walking) {
            case "forward":
                this.otherDirection = false;
                this.moveLeft();
                break;
            case "back":
                this.otherDirection = true;
                this.moveRight();
                break;
        }
    }

    setWalkingSwitch() {
        if (this.x >= 2050) {
            this.walking = "forward";
        }
        if (this.x <= 1650) {
            this.walking = "back";
        }
    }



}