class Platform {
    constructor(ctx, platformX, platformY, platformW, platformH, speed) {
        this.ctx = ctx
        this.platformSpecs = {
            pos: { platformX: platformX, platformY: platformY },
            size: { platformW: platformW, platformH: platformH },
            speed: speed,
        }
        this.instancePlatform();
        this.drawPlatform();
    }
    instancePlatform() {
        this.image = new Image();
        this.image.src = "./img/platform-platform.png"
    }
    drawPlatform() {
        this.move()
        this.ctx.drawImage(
            this.image,
            this.platformSpecs.pos.platformX,
            this.platformSpecs.pos.platformY,
            this.platformSpecs.size.platformW,
            this.platformSpecs.size.platformH

        )
    }
    move() {
        this.platformSpecs.pos.platformX += this.platformSpecs.speed
    }

}