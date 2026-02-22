class StatusbarHealth extends DrawableObject {

    percentage = 100;

    healthBarImg = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ]

    constructor() {
        super().loadImages(this.healthBarImg);
        
        
        this.x = 20;
        this.y = 0;
        this.height = 60;
        this.width = 200;
        this.setPercentage(100);

    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.healthBarImg[this.updateBar()];
        this.img = this.imageCache[path];
    }

    updateBar() {
        switch (true) {
            case (this.percentage >= 80 && this.percentage <= 100):
                return 5;
            case (this.percentage >= 60 && this.percentage <= 80):
                return 4;
            case (this.percentage >= 40 && this.percentage <= 60):
                return 3;
            case (this.percentage >= 20 && this.percentage <= 40):
                return 2;
            case (this.percentage > 0 && this.percentage <= 20):
                return 1;
            case (this.percentage == 0):
                return 0;
        }
    }


}