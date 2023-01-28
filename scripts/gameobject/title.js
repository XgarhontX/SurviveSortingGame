class TitleScreen {
    constructor() {

    }

    draw() {
        GAME_ENGINE.ctx.save()

        GAME_ENGINE.ctx.font = 'bold 128px Arial'
        GAME_ENGINE.ctx.fillStyle = 'black'
        GAME_ENGINE.ctx.textAlign = "center"
        GAME_ENGINE.ctx.fillText("", posX, posY)

        GAME_ENGINE.ctx.restore()
    }
}