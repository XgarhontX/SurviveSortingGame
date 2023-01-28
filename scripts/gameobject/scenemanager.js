class SceneManager {
    constructor(levelName) {
        this.score = 0
        this.loadLevel(levelName)
        this.bgm = null
    }

    loadLevel(levelName) {
        this.clearWorld()
        switch (levelName) {
            case "title":
                GAME_ENGINE.addEntity(new TitleScreen())
                break;
            case "level1":
                if (this.bgm == null || this.bgm.paused) {
                    this.bgm = ASSET_MANAGER.getAsset("./assets/1.28 goofy ahh ahh game fade.mp3")
                    ASSET_MANAGER.autoRepeat("./assets/1.28 goofy ahh ahh game fade.mp3")
                    this.bgm.play()
                }
                this.camera = new Camera()
                GAME_ENGINE.addEntity(this.camera)
                this.player = new Player()
                GAME_ENGINE.addEntity(this.player)
                this.hud = new HUD()
                GAME_ENGINE.addEntity(this.hud)
                GAME_ENGINE.addEntity(new Spawner())
                break;
            default:
                break;
        }
    }

    onLose() {
        this.camera.startShake(3, 10)
        this.hud.lose = true
        ASSET_MANAGER.playAsset("./assets/crunchy vine boom.mp3", 0, 1)
    }

    clearWorld() {
        GAME_ENGINE.entities.forEach((entity) => {
            entity.removeFromWorld = true
        })
    }
}

class Camera {
    constructor() {
        this.posX = 0
        this.posY = 0
        this.shake_current = 0
        this.shake_intensity = 0
    }

    startShake(length, intensity) {
        this.shake_current = length
        this.shake_max = length
        this.shake_intensity = intensity
    }

    update() {
        if (this.shake_current > 0) {
            this.posX = ((Math.random() * 2) - 1) * this.shake_intensity * (this.shake_current/this.shake_max)
            this.posY = ((Math.random() * 2) - 1) * this.shake_intensity * (this.shake_current/this.shake_max)
            this.shake_current -= GAME_ENGINE.clockTick
        } else {
            this.posX = 0
            this.posY = 0
        }
    }

    draw() {

    }
}

