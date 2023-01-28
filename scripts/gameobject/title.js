class TitleScreen {
    constructor() {
        this.draw()
    }

    update() {
        if (GAME_ENGINE.key_up ||
            GAME_ENGINE.key_down ||
            GAME_ENGINE.key_restart ||
            GAME_ENGINE.key_left ||
            GAME_ENGINE.key_right) {
            SCENE_MANAGER.loadLevel("level1")
        }
    }

    draw() {
        GAME_ENGINE.ctx.save()

        GAME_ENGINE.ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Title.jpg"),0,0,FRAME_WIDTH,FRAME_HEIGHT)

        GAME_ENGINE.ctx.restore()
    }
}