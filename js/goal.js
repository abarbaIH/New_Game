class Goal {
    constructor(ctx, goalX, goalY, goalW, goalH, winnerX, winnerY, winnerW, winnerH) {
        this.ctx = ctx
        this.goalSpecs = {
            pos: { goalX: goalX, goalY: goalY },
            size: { goalW: goalW, goalH: goalH },

        }
        this.winnerSpecs = {
            pos: { winnerX: winnerX, winnerY: winnerY },
            size: { winnerW: winnerW, winnerH: winnerH },
        }
        this.instanceGoal()
        this.instanceWinner()
        this.drawGoal()
    }
    instanceGoal() {
        this.image = new Image()
        this.image.src = "./img/nenuphar-goal.png"
    }

    drawGoal() {
        this.ctx.drawImage(
            this.image,
            this.goalSpecs.pos.goalX,
            this.goalSpecs.pos.goalY,
            this.goalSpecs.size.goalW,
            this.goalSpecs.size.goalH
        )
    }
    instanceWinner() {
        this.imageWinner = new Image()
        this.imageWinner.src = "./img/winner-bg.png"
    }

    drawWinner() {
        this.ctx.drawImage(
            this.imageWinner,
            this.winnerSpecs.pos.winnerX,
            this.winnerSpecs.pos.winnerY,
            this.winnerSpecs.size.winnerW,
            this.winnerSpecs.size.winnerH
        )
    }
}