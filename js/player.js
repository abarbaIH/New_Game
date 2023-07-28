class Player {
    constructor(ctx, playerX, playerY, playerW, playerH, canvasSize, level) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerSpecs = {
            pos: { playerX: playerX, playerY: playerY },
            size: { playerW: playerW, playerH: playerH },
            speedMove: Math.round(this.canvasSize.canvasW / 24 / 10) * 10,
            speedJump: Math.round(this.canvasSize.canvasH / 5 / 10) * 10,
            gravity: 10,
            liveCounter: 100,
            level: level
        }
        this.instancePlayer()
        this.drawPlayer()
        this.instanceAudio()
        this.instanceAudioEnemmie()
        this.instanceAudioGoal()
        this.instanceAudioGameOver()
        this.instanceAudioWinner()
    }

    instancePlayer() {
        this.image = new Image()
        this.image.src = "./img/frog-player.png"
    }
    instanceAudio() {
        this.audio = new Audio()
        this.audio.src = "./audio/frog-audio.mp3"
    }
    instanceAudioGoal() {
        this.audioGoal = new Audio()
        this.audioGoal.src = "./audio/goal-audio.mp3"
    }

    instanceAudioGameOver() {
        this.audioGameOver = new Audio()
        this.audioGameOver.src = "./audio/gameover-audio.mp3"
    }
    instanceAudioWinner() {
        this.audioWinner = new Audio()
        this.audioWinner.src = "./audio/winner-audio.mp3"
    }
    instanceAudioEnemmie() {
        if (this.playerSpecs.level === 0) {
            this.audioEnemie = new Audio();
            this.audioEnemie.src = "./audio/monkey-audio.mp3"
        }
        if (this.playerSpecs.level === 1) {
            this.audioEnemie = new Audio();
            this.audioEnemie.src = "./audio/pingui-audio.mp3"
        }
        if (this.playerSpecs.level === 2) {
            this.audioEnemie = new Audio()
            this.audioEnemie.src = "./audio/alpacat-audio.mp3"
        }

    }

    playAudioPlayer() {
        this.audio.play()
    }
    playAudioEnemie() {
        this.audioEnemie.play()
    }
    playAudioGoal() {
        this.audioGoal.play()
    }

    playAudioGameOver() {
        this.audioGameOver.play()
    }
    playAudioWinner() {
        this.audioWinner.play()
    }
    stopAudioWinner() {
        this.audioWinner.pause()
    }

    drawPlayer() {
        this.drawLifeBar()
        this.fallPlayer()
        this.ctx.drawImage(
            this.image,
            this.playerSpecs.pos.playerX,
            this.playerSpecs.pos.playerY,
            this.playerSpecs.size.playerW,
            this.playerSpecs.size.playerH
        )
    }
    drawLifeBar() {
        document.querySelector('#scoreBar').style.width = `${this.playerSpecs.liveCounter}%`
    }

    fallPlayer() {
        if (this.playerSpecs.pos.playerY < this.canvasSize.canvasH - this.playerSpecs.size.playerH) {
            this.playerSpecs.pos.playerY += this.playerSpecs.gravity
        }
    }
    viewPlayer() {
        if (this.playerSpecs.pos.playerX > 0 &&
            this.playerSpecs.pos.playerX + this.playerSpecs.size.playerW < this.canvasSize.canvasW) {
            return true
        }
    }
}