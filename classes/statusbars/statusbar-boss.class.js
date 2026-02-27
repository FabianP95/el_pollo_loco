class StatusBarBoss extends DrawableObject {

    bossHealthBarImg = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ]

    constructor() {
        super().loadImages(this.bossHealthBarImg);
        this.height = 60;
        this.width = 200;
        this.x = 2000;
        this.y = 20
        this.setPercentage(100);

    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.bossHealthBarImg[this.updateBar()];
        this.img = this.imageCache[path];
    }

    updateBar() {
        switch (true) {
            case (this.percentage > 80 && this.percentage <= 100):
                return 5;
            case (this.percentage > 60 && this.percentage <= 80):
                return 4;
            case (this.percentage > 40 && this.percentage <= 60):
                return 3;
            case (this.percentage > 20 && this.percentage <= 40):
                return 2;
            case (this.percentage > 0 && this.percentage <= 20):
                return 1;
            case (this.percentage == 0):
                return 0;
        }
    }


}