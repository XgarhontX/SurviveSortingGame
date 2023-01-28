class AnimatorText extends Animator {
    constructor() {
        super();
    }

    drawFrame(posX, posY, text) {
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.font = 'bold 128px Arial'
        GAME_ENGINE.ctx.fillStyle = 'Gray'
        GAME_ENGINE.ctx.textAlign = "center"
        GAME_ENGINE.ctx.fillText(Math.floor(text), posX, posY)
        GAME_ENGINE.ctx.restore()
    }
}