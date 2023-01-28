const FALLINGBRICK_SPEED = 500 // 1


class FallingBlock extends GameObjectBB {
    constructor(posX, posY, width=20, height=20, color="black", health=3) {
        super(posX, posY, width, height, color);
        this.hasFallen = false
        this.health = health
        // console.log("spawned")
    } //TODO Debug remove

    update() {
        if (!this.hasFallen) {
            this.updateMovement()
            this.saveLastBB()
            this.updateBB()
            this.handleCollisions()
            this.updateBB()
        }
        this.draw()
    }

    updateMovement() {
        this.posY += FALLINGBRICK_SPEED * GAME_ENGINE.clockTick
    }

    handleCollisions() {
        //Ground
        if (this.getBottomPosY() > FRAME_HEIGHT) {
            this.setBottomPosY(FRAME_HEIGHT)
            this.hasFallen = true
        }

        GAME_ENGINE.entities.forEach((entity) => {
            if (entity instanceof FallingBlock && entity != this) {
                if (this.BB.collide(entity.BB)) {
                    this.setBottomPosY(entity.BB.top)
                    this.hasFallen = true
                    console.log("fallen")
                }
            }
        })
    }

    updateBB() {
        super.updateBB();
    }

    takeDamage(damage) {
        this.health -= damage
        if (this.health <= 0) {
            this.removeFromWorld = true
        }
    }
}