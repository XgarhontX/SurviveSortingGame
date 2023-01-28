class SceneManager {
    constructor(levelName) {
        this.score = 0
        this.loadLevel(levelName)
    }

    loadLevel(levelName) {
        this.clearWorld()
        switch (levelName) {
            case "title":
                break;
            case "game1":
                let player = new Player(250, 850)
                GAME_ENGINE.addEntity(player)
                GAME_ENGINE.addEntity(new HUD(player))
                GAME_ENGINE.addEntity(new Spawner(player))
                break;
            default:
                break;
        }
    }

    clearWorld() {
        GAME_ENGINE.entities.forEach((entity) => {
            entity.removeFromWorld = true
        })
    }
}