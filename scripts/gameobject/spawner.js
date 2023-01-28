SPAWNER_COOLDOWN_INIT = 0.25
SPAWNER_COOLDOWN_DECREASE_FACTOR = 0.999

SPAWNER_PLACES_20 = 25

SPAWNER_SWEEP_COOLDOWN = 45
SPAWNER_SWEEP_INCREASE = 7

class Spawner extends GameObject {
    constructor() {
        super(0,0,0,0)

        this.cooldownSpawn_Current = SPAWNER_COOLDOWN_INIT
        this.cooldownSpawn_Reset = this.cooldownSpawn_Current

        this.spawnedSweepCount = 0
    }

    update() {
        this.trySweep()
        this.trySpawn()
    }

    draw() {}

    trySweep() {
        if (this.spawnedSweepCount == 45 + SPAWNER_SWEEP_INCREASE) {
            GAME_ENGINE.entities.forEach((entity) => {
                if (entity instanceof FallingBlock && entity.hasFallen) {
                    entity.posY += entity.width
                    entity.updateBB()
                    if (entity.posY > FRAME_HEIGHT){
                        entity.removeFromWorld = true
                    }
                }
            })
            this.spawnedSweepCount = 0
        }
    }

    trySpawn() {
        if (this.cooldownSpawn_Current > 0) {
            this.cooldownSpawn_Current -= GAME_ENGINE.clockTick
            return
        }

        this.cooldownSpawn_Reset *= SPAWNER_COOLDOWN_DECREASE_FACTOR
        this.cooldownSpawn_Current = this.cooldownSpawn_Reset

        GAME_ENGINE.addEntity(new FallingBlock(20 * (randomInt(SPAWNER_PLACES_20)), -20))
        this.spawnedSweepCount++
    }
}