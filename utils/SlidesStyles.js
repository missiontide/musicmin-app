export default class SlideStyles {
    constructor() {
        // set default styles
        this.titleSlideTextStyle = {
            w: "100%",
            h: "100%",
            align: "center",
            valign: "middle",
            fontSize: 65,
            fontFace: "Century Gothic",
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
            fontFace: "Arial",
            fit: "shrink",
            isTextBox: true,
            color: "000000",
        };

        this.slideBackgroundStyle = {
            color: "FFFFFF",
        }

        this.allCaps = false;
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

    setAllCaps(bool) {
        // enable all caps
        if (bool) {
            this.allCaps = true;
            this.lyricSlideTextStyle.fontFace = "Calibri";
        } else {
            this.allCaps = false;
            this.lyricSlideTextStyle.fontFace = "Arial";
        }
    }

    getTitleSlideMasterProps() {
        return {
            title: "Title Slide",
            background: this.slideBackgroundStyle,
            objects: [
                { placeholder: {
                    text: "Song Title",
                    options: {
                        ...this.titleSlideTextStyle,
                        name: "title",
                        type: "title",
                    }
                } },
            ]
        }
    }

    getLyricSlideMasterProps() {
        return {
            title: "Lyric Slide",
            background: this.slideBackgroundStyle,
            objects: [
                { placeholder: {
                    text: "Song Lyrics",
                    options: {
                        ...this.lyricSlideTextStyle,
                        name: "body",
                        type: "body",
                    }
                } },
            ]
        }
    }
}
