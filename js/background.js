class Background {
    constructor(ctx, backgroundX, backgroundY, backgroundW, backgroundH, level) {
        this.ctx = ctx;

        this.backgroundSpecs = {
            pos: { backgroundX: backgroundX, backgroundY: backgroundY },
            size: { backgroundW: backgroundW, backgroundH: backgroundH }
        }
        this.level = level
        this.instanceBackground()
        this.instanceAudioBackground()
        this.drawBackground()
    }
    instanceAudioBackground() {
        this.audioBackground = new Audio()
        this.audioBackground.src = "./audio/game-music.mp3"
    }
    playAudioBackground() {
        this.audioBackground.play()
        this.audioBackground.volume -= 0.7
    }
    stopAudioBackground() {
        this.audioBackground.pause()
    }

    instanceBackground() {
        if (this.level === 0) {
            this.image = new Image()
            this.image.src = "./img/jungle-bg.jpg"
        }
        if (this.level === 1) {
            this.image = new Image()
            this.image.src = "./img/winter-bg.jpg"
        }
        if (this.level === 2) {
            this.image = new Image()
            this.image.src = "./img/farm-bg.jpg"
        }
    }

    drawBackground() {
        this.ctx.drawImage(
            this.image,
            this.backgroundSpecs.pos.backgroundX,
            this.backgroundSpecs.pos.backgroundY,
            this.backgroundSpecs.size.backgroundW,
            this.backgroundSpecs.size.backgroundH
        )
    }
}