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
}