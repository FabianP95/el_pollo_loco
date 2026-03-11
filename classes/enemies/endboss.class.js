/**
 * Endboss class represents the final boss enemy in the game.
 * Extends MovableObject to inherit physics and collision detection.
 * @class
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    height = 400;
    width = 250;
    world;
    walking = "forward";
    triggered = false;
    attack = false;
    statusBarBossHealth;

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

    introSound = new Audio('assets/audio/enemies/boss/boss-intro.mp3');
    hitSound = new Audio('assets/audio/enemies/boss/boss-hit.wav');
    deadSound = new Audio('assets/audio/enemies/boss/boss-dead.mp3');

    /**
     * Creates a new Endboss instance.
     * Initializes all animation images, sounds, and starting position.
     * @constructor
     */
    constructor() {
        super().loadImg(this.walkingImg[0]);
        this.loadImages(this.alertImg);
        this.loadImages(this.walkingImg);
        this.loadImages(this.hurtImg);
        this.loadImages(this.attackImg);
        this.loadImages(this.deadImg);
        this.energy = 100;
        this.speed = 30;
        this.x = 2650;
        this.y = canvasHeight - 30 - this.height;
        this.animate()
    }

    /**
     * Sets up animation intervals for endboss behavior and animations.
     * Manages all state transitions (walking, attack, hit, death, triggered).
     */
    animate() {
        setInterval(() => {
            this.placeStatusbar();
            switch (true) {
                case this.attack:
                    this.handleAttack();
                    break;
                case this.isHit():
                    this.handleEndbossHit();
                    break;
                case this.isDead():
                    this.handleEndbossDeath();
                    break;
                case this.triggered:
                    this.handleEndbossTriggered();
                    break;
                default: this.handleEndbossWalking();
                    break;
            }
        }, 180)
    }

    /**
     * Handles endboss walking behavior when not triggered.
     * Plays walking animation and moves the boss.
     */
    handleEndbossWalking() {
        this.playAnimation(this.walkingImg);
        this.walkingAround();
    }

    /**
     * Handles endboss attack behavior.
     * Moves forward and plays attack animation.
     */
    handleAttack() {
        if (this.world.character.isDead()) {
            return
        }
        this.x -= 60;
        this.playAnimation(this.attackImg);
        this.playSound(this.introSound, 0.15);
    }

    /**
     * Handles endboss when hit by player.
     * Plays hurt animation.
     */
    handleEndbossHit() {
        this.otherDirection = false;
        this.playAnimation(this.hurtImg);
        this.playSound(this.hitSound, 0.15);
    }

    /**
     * Handles endboss alert state when triggered by player proximity.
     * Plays alert animation.
     */
    handleEndbossTriggered() {
        this.otherDirection = false;
        this.playAnimation(this.alertImg);
        
    }

    /**
     * Handles endboss death animation and transition to game won screen.
     * Plays death animation and sound, then triggers screen switch.
     */
    handleEndbossDeath() {
        this.stopAtLastImage(this.deadImg);
        if (!this.hasPlayed) {
            this.playSound(this.deadSound, 0.15);
            this.hasPlayed = true;
        }
        this.goUnderground();
        setTimeout(() => {
            this.world.switchToScreen("won");
        }, 1000);
    }

    /**
     * Manages the walking pattern of the endboss.
     * Determines direction based on walking switch and moves accordingly.
     */
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

    /**
     * Sets the walking direction based on boundary positions.
     * Switches between forward and back walking directions at defined boundaries.
     */
    setWalkingSwitch() {
        if (this.x >= 2650) {
            this.walking = "forward";
        }
        if (this.x <= 2250) {
            this.walking = "back";
        }
    }

    /**
     * Updates the status bar position to follow the endboss.
     * Keeps health bar above the boss.
     */
    placeStatusbar() {
        this.statusBarBossHealth.x = this.x;
        this.statusBarBossHealth.y = this.y - 10;
    }
}