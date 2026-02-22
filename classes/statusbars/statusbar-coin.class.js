class StatusBarCoin extends DrawableObject {
    coinBarImg = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ]

    constructor() {
        super().loadImages(this.coinBarImg);
        this.x = 20;
        this.y = 110;
        this.height = 60;
        this.width = 200;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.coinBarImg[this.updateBar()];
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