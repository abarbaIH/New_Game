const game = {
    appName: 'Crazy Frog',
    author: 'Alvaro & Lourdes',
    version: '1.0.0',
    license: undefined,
    description: 'Help your crazy frog to reach his water lily',
    ctx: undefined,
    level: 0,
    frameIndex: 0,
    FPS: 60,
    background: undefined,
    player: undefined,
    playing: undefined,
    platforms1: [],
    platforms2: [],
    platforms3: [],
    platforms4: [],
    enemies1: [],
    canvasSize: {
        canvasW: undefined,
        canvasH: undefined,
    },

    init() {
        this.setContext()
        this.setDimensions()
        this.setEventListeners()
        this.reset()
        this.playing && clearInterval(this.playing)
        this.start()
    },

    setContext() {
        this.ctx = document.querySelector('canvas').getContext('2d')
    },

    setDimensions() {
        this.canvasSize = {
            canvasW: window.innerWidth,
            canvasH: window.innerHeight - 320,
        }
        document.querySelector('canvas').setAttribute('width', this.canvasSize.canvasW)
        document.querySelector('canvas').setAttribute('height', this.canvasSize.canvasH)
    },

    setEventListeners() {
        document.onkeydown = event => {
            const { key } = event
            if (key == 'ArrowLeft') {
                this.moveRight()
            }
            if (key == 'ArrowRight') {
                this.moveLeft()
            }
            if (key == ' ' && this.playerPosition()) {
                this.jump()
            }
        }
    },

    jump() {
        this.player.playerSpecs.pos.playerY -= this.player.playerSpecs.speedJump
        this.player.playAudioPlayer()
    },

    moveRight() {
        if (this.player.playerSpecs.pos.playerX > 0) {
            this.player.playerSpecs.pos.playerX -= this.player.playerSpecs.speedMove
        }
    },

    moveLeft() {
        if (this.player.playerSpecs.pos.playerX < this.canvasSize.canvasW - this.player.playerSpecs.size.playerW) {
            this.player.playerSpecs.pos.playerX += this.player.playerSpecs.speedMove
        }
    },

    start() {

        this.background.playAudioBackground()

        this.playing = setInterval(() => {
            this.frameIndex > 5000 ? this.frameIndex = 0 : this.frameIndex++
            this.clearAll()
            this.drawAll()
            this.generatePlatforms()
            this.generateEnemies()
            this.clearPlatforms()
            this.platformColisionUp4()

            if (this.level === 0 && this.platformColisionUp4() && this.player.viewPlayer()) {
                this.player.playerSpecs.pos.playerX += 15
                this.player.playerSpecs.gravity = 0
            } else {
                this.player.playerSpecs.gravity = 10
            }
            if (this.level === 1 && this.platformColisionUp4() && this.player.viewPlayer()) {
                this.player.playerSpecs.pos.playerX += 10
                this.player.playerSpecs.gravity = 0
            }
            if (this.level === 2 && this.platformColisionUp4() && this.player.viewPlayer()) {
                this.player.playerSpecs.pos.playerX += 5
                this.player.playerSpecs.gravity = 0
            }

            this.platformColisionUp3()
            if (this.platformColisionUp3() && this.player.viewPlayer()) {
                this.player.playerSpecs.pos.playerX -= 15
                this.player.playerSpecs.gravity = 0
            }
            this.platformColisionUp2()
            if (this.platformColisionUp2() && this.player.viewPlayer()) {
                this.player.playerSpecs.pos.playerX += 15
                this.player.playerSpecs.gravity = 0
            }

            this.platformColisionUp1()
            if (this.level === 0 && this.platformColisionUp1() && this.player.viewPlayer()) {
                this.player.playerSpecs.pos.playerX -= 15
                this.player.playerSpecs.gravity = 0
            }
            if (this.level === 1 && this.platformColisionUp1() && this.player.viewPlayer()) {
                this.player.playerSpecs.pos.playerX += 5
                this.player.playerSpecs.gravity = 0
            }
            if (this.level === 2 && this.platformColisionUp1() && this.player.viewPlayer()) {
                this.player.playerSpecs.pos.playerX += 5
                this.player.playerSpecs.gravity = 0
            }

            this.goalColision()
            if (this.goalColision() === true && this.level === 0) {
                this.player.playAudioGoal()
                this.player.playerSpecs.gravity = 0
                clearInterval(this.playing)
                this.background.stopAudioBackground()
                if (confirm("Nivel 1 Completado!") === true) {
                    this.level++
                    this.init()
                }
            }
            if (this.goalColision() === true && this.level === 1) {
                //this.player.playAudioGoal()
                this.player.playerSpecs.gravity = 0
                clearInterval(this.playing)
                this.background.stopAudioBackground()
                if (confirm("Nivel 2 Completado!") === true) {
                    this.level++
                    this.init()
                }
            }
            if (this.goalColision() === true && this.level === 2) {
                this.player.playerSpecs.gravity = 0
                clearInterval(this.playing)
                this.background.stopAudioBackground()
                this.clearAll()
                this.goal.drawWinner()
                this.player.playAudioWinner()
                this.level = 0
            }

            this.enemieColision1()
            if (this.player.playerSpecs.liveCounter > 0) {
                if (this.enemieColision1()) {
                    this.player.playerSpecs.liveCounter -= 1
                    this.player.playAudioEnemie()
                }
            }
            else {

                this.ctx.fillStyle = "black"
                this.ctx.font = '250px arial'
                this.ctx.fillText("GAME OVER!", this.canvasSize.canvasW / 2 - 600, this.canvasSize.canvasH / 2)
                this.background.stopAudioBackground()
                this.player.playAudioGameOver()
                clearInterval(this.playing)
            }
        }, 1000 / this.FPS)
    },

    reset() {
        this.background = new Background(
            this.ctx,
            0,
            0,
            this.canvasSize.canvasW,
            this.canvasSize.canvasH,
            this.level)
        this.player = new Player(
            this.ctx,
            this.canvasSize.canvasW / 2,
            this.canvasSize.canvasH - (Math.round((this.canvasSize.canvasH / 12) / 10) * 10),
            Math.round((this.canvasSize.canvasH / 12) / 10) * 10,
            Math.round((this.canvasSize.canvasH / 12) / 10) * 10,
            this.canvasSize,
            this.level)
        this.goal = new Goal(
            this.ctx,
            this.canvasSize.canvasW * 0.75,
            Math.round((this.canvasSize.canvasH * 0.15) / 10) * 10,
            Math.round((this.canvasSize.canvasH / 4) / 10) * 10,
            Math.round((this.canvasSize.canvasH / 6) / 10) * 10,
            0,
            0,
            this.canvasSize.canvasW,
            this.canvasSize.canvasH)
        this.enemies1 = []
        this.platforms1 = []
        this.platforms2 = []
        this.platforms3 = []
        this.platforms4 = []
    },

    drawAll() {
        this.background.drawBackground()
        this.player.drawPlayer()
        this.goal.drawGoal()
        this.platforms1.forEach(elm => elm.drawPlatform())
        this.platforms2.forEach(elm => elm.drawPlatform())
        this.platforms3.forEach(elm => elm.drawPlatform())
        this.platforms4.forEach(elm => elm.drawPlatform())
        this.enemies1.forEach(elm => elm.drawEnemie())
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.canvasW, this.canvasSize.canvasH)
    },

    generateEnemies() {
        if (this.level === 0) {
            if (this.enemies1.length < 5) {
                if (this.frameIndex % 150 === 0) {
                    this.enemies1.push(new Enemie(this.ctx, this.canvasSize, Math.random() * 400, 200, 500, 500, 20, 5, this.level))
                }
            }
        }
        if (this.level === 1) {
            if (this.enemies1.length < 10) {
                if (this.frameIndex % 150 === 0) {
                    this.enemies1.push(new Enemie(this.ctx, this.canvasSize, Math.random() * 400, 200, 600, 600, 30, 10, this.level))
                }
            }
        }
        if (this.level === 2) {
            if (this.enemies1.length < 5) {
                if (this.frameIndex % 150 === 0) {
                    this.enemies1.push(new Enemie(this.ctx, this.canvasSize, Math.random() * 400, 200, 800, 800, 30, 10, this.level))
                }
            }
        }

    },

    generatePlatforms() {
        if (this.level === 0) {
            if (this.frameIndex % 80 === 0) {
                this.platforms1.push(new Platform(
                    this.ctx,
                    this.canvasSize.canvasW,
                    Math.round((this.canvasSize.canvasH - this.canvasSize.canvasH / 1.5) / 10) * 10,
                    700,
                    120,
                    -15))
            }
            if (this.frameIndex % 120 === 0) {
                this.platforms2.push(new Platform(
                    this.ctx,
                    -300,
                    Math.round((this.canvasSize.canvasH - this.canvasSize.canvasH / 1.9) / 10) * 10,
                    500,
                    120,
                    15))
            }
            if (this.frameIndex % 100 === 0) {
                this.platforms3.push(new Platform(
                    this.ctx,
                    this.canvasSize.canvasW,
                    Math.round((this.canvasSize.canvasH - this.canvasSize.canvasH / 2.8) / 10) * 10,
                    600,
                    120,
                    -15))
            }
            if (this.frameIndex % 80 === 0) {
                this.platforms4.push(new Platform(
                    this.ctx,
                    -300,
                    Math.round((this.canvasSize.canvasH - this.canvasSize.canvasH / 6) / 10) * 10,
                    500,
                    120,
                    15))
            }
        }
        if (this.level === 1) {
            if (this.frameIndex % 80 === 0) {
                this.platforms1.push(new Platform(
                    this.ctx,
                    this.canvasSize.canvasW,
                    Math.round((this.canvasSize.canvasH - this.canvasSize.canvasH / 1.5) / 10) * 10,
                    350,
                    120,
                    -15))
            }
            if (this.frameIndex % 120 === 0) {
                this.platforms2.push(new Platform(
                    this.ctx,
                    -300,
                    Math.round((this.canvasSize.canvasH - this.canvasSize.canvasH / 1.9) / 10) * 10,
                    500,
                    120,
                    15))
            }
            if (this.frameIndex % 100 === 0) {
                this.platforms3.push(new Platform(
                    this.ctx,
                    this.canvasSize.canvasW,
                    Math.round((this.canvasSize.canvasH - this.canvasSize.canvasH / 2.8) / 10) * 10,
                    600,
                    120,
                    -15))
            }
            if (this.frameIndex % 80 === 0) {
                this.platforms4.push(new Platform(
                    this.ctx,
                    -300,
                    Math.round((this.canvasSize.canvasH - this.canvasSize.canvasH / 6) / 10) * 10,
                    700,
                    120,
                    15))
            }
        }
        if (this.level === 2) {
            if (this.frameIndex % 80 === 0) {
                this.platforms1.push(new Platform(
                    this.ctx,
                    this.canvasSize.canvasW,
                    Math.round((this.canvasSize.canvasH - this.canvasSize.canvasH / 1.5) / 10) * 10,
                    350,
                    120,
                    -15))
            }
            if (this.frameIndex % 120 === 0) {
                this.platforms2.push(new Platform(
                    this.ctx,
                    -300,
                    Math.round((this.canvasSize.canvasH - this.canvasSize.canvasH / 1.9) / 10) * 10,
                    500,
                    120,
                    15))
            }
            if (this.frameIndex % 100 === 0) {
                this.platforms3.push(new Platform(
                    this.ctx,
                    this.canvasSize.canvasW,
                    Math.round((this.canvasSize.canvasH - this.canvasSize.canvasH / 2.8) / 10) * 10,
                    600,
                    120,
                    -15))
            }
            if (this.frameIndex % 80 === 0) {
                this.platforms4.push(new Platform(
                    this.ctx,
                    -300,
                    Math.round((this.canvasSize.canvasH - this.canvasSize.canvasH / 6) / 10) * 10,
                    700,
                    120,
                    15))
            }
        }

    },

    clearPlatforms() {
        this.platforms1 = this.platforms1.filter(elm => elm.platformSpecs.pos.platformX > 0 - elm.platformSpecs.size.platformW)
        this.platforms2 = this.platforms2.filter(elm => elm.platformSpecs.pos.platformX < this.canvasSize.canvasW)
        this.platforms3 = this.platforms3.filter(elm => elm.platformSpecs.pos.platformX > 0 - elm.platformSpecs.size.platformW)
        this.platforms4 = this.platforms4.filter(elm => elm.platformSpecs.pos.platformX < this.canvasSize.canvasW)
    },

    platformColisionUp1() {
        return this.platforms1.some(elm => {
            return (
                this.player.playerSpecs.pos.playerX + this.player.playerSpecs.size.playerW > elm.platformSpecs.pos.platformX &&
                this.player.playerSpecs.pos.playerX < elm.platformSpecs.pos.platformX + elm.platformSpecs.size.platformW &&
                this.player.playerSpecs.pos.playerY + this.player.playerSpecs.size.playerH > elm.platformSpecs.pos.platformY - 10 &&
                this.player.playerSpecs.pos.playerY + this.player.playerSpecs.size.playerH < elm.platformSpecs.pos.platformY + 10
            )
        })
    },

    platformColisionUp2() {
        return this.platforms2.some(elm => {
            return (
                this.player.playerSpecs.pos.playerX + this.player.playerSpecs.size.playerW > elm.platformSpecs.pos.platformX &&
                this.player.playerSpecs.pos.playerX < elm.platformSpecs.pos.platformX + elm.platformSpecs.size.platformW &&
                this.player.playerSpecs.pos.playerY + this.player.playerSpecs.size.playerH > elm.platformSpecs.pos.platformY - 10 &&
                this.player.playerSpecs.pos.playerY + this.player.playerSpecs.size.playerH < elm.platformSpecs.pos.platformY + 10
            )
        })
    },

    platformColisionUp3() {
        return this.platforms3.some(elm => {
            return (
                this.player.playerSpecs.pos.playerX + this.player.playerSpecs.size.playerW > elm.platformSpecs.pos.platformX &&
                this.player.playerSpecs.pos.playerX < elm.platformSpecs.pos.platformX + elm.platformSpecs.size.platformW &&
                this.player.playerSpecs.pos.playerY + this.player.playerSpecs.size.playerH > elm.platformSpecs.pos.platformY - 10 &&
                this.player.playerSpecs.pos.playerY + this.player.playerSpecs.size.playerH < elm.platformSpecs.pos.platformY + 10
            )
        })
    },

    platformColisionUp4() {
        return this.platforms4.some(elm => {
            return (
                this.player.playerSpecs.pos.playerX + this.player.playerSpecs.size.playerW > elm.platformSpecs.pos.platformX &&
                this.player.playerSpecs.pos.playerX < elm.platformSpecs.pos.platformX + elm.platformSpecs.size.platformW &&
                this.player.playerSpecs.pos.playerY + this.player.playerSpecs.size.playerH > elm.platformSpecs.pos.platformY - 10 &&
                this.player.playerSpecs.pos.playerY + this.player.playerSpecs.size.playerH < elm.platformSpecs.pos.platformY + 10
            )
        })
    },

    goalColision() {
        return (
            this.player.playerSpecs.pos.playerX + this.player.playerSpecs.size.playerW > this.goal.goalSpecs.pos.goalX + 60 &&
            this.player.playerSpecs.pos.playerX < this.goal.goalSpecs.pos.goalX + this.goal.goalSpecs.size.goalW - 60 &&
            this.player.playerSpecs.pos.playerY + this.player.playerSpecs.size.playerH > this.goal.goalSpecs.pos.goalY - 10 + 110 &&
            this.player.playerSpecs.pos.playerY + this.player.playerSpecs.size.playerH < this.goal.goalSpecs.pos.goalY + 10 + 110
        )
    },

    enemieColision1() {
        return this.enemies1.some(elm => {
            return (
                this.player.playerSpecs.pos.playerX < elm.enemieSpecs.pos.enemieX + elm.enemieSpecs.size.enemieW &&
                this.player.playerSpecs.pos.playerX + this.player.playerSpecs.size.playerW > elm.enemieSpecs.pos.enemieX &&
                this.player.playerSpecs.pos.playerY < elm.enemieSpecs.pos.enemieY + elm.enemieSpecs.size.enemieH &&
                this.player.playerSpecs.size.playerH + this.player.playerSpecs.pos.playerY > elm.enemieSpecs.pos.enemieY
            )
        })
    },
    playerPosition() {
        if (this.player.playerSpecs.pos.playerY === this.canvasSize.canvasH - this.player.playerSpecs.size.playerH ||
            this.platformColisionUp1() ||
            this.platformColisionUp2() ||
            this.platformColisionUp3() ||
            this.platformColisionUp4()) {
            return true
        } else {
            return false
        }
    },
}