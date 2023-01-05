export default class SlideStyles {
    constructor() {
        // set default styles
        this.titleSlideTextStyle = {
            w: "100%",
            h: "100%",
            align: "center",
            valign: "middle",
            fontSize: 65,
            fontFace: 'Century Gothic',
            bold: true,
            fit: "shrink",
            isTextBox: true,
            color: "000000",
        };

        this.lyricSlideTextStyle = {
            w: "100%",
            h: "100%",
            align: "center",
            valign: "middle",
            fontSize: 35,
            fontFace: 'Arial',
            fit: "shrink",
            isTextBox: true,
            color: "000000",
        };

        this.slideBackgroundStyle = {
            color: "FFFFFF",
        }
    }

    setDarkMode(bool) {
        // enable dark mode
        if (bool) {
            this.slideBackgroundStyle.color = "000000"
            this.titleSlideTextStyle.color = "FFFFFF"
            this.lyricSlideTextStyle.color = "FFFFFF"
        } else {
            this.slideBackgroundStyle.color = "FFFFFF"
            this.titleSlideTextStyle.color = "000000"
            this.lyricSlideTextStyle.color = "000000"
        }
    }
}
