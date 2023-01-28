PLAYER_DIMENSIONS = 25
PLAYER_ACCEL = 1000
PLAYER_MAX_HORIZONTAL_VEL = 1000
PLAYER_JUMP_VEL = 800
PLAYER_TERMINAL_FALL_VEL = 1000
PLAYER_GROUND_POUND_ADDITIONAL_ACCEL = 5000
PLAYER_FRICTION = 500
PLAYER_GRAVITY = 2000

class Player extends GameObjectBB {
    constructor(posX, posY) {
        super(posX, posY, PLAYER_DIMENSIONS, PLAYER_DIMENSIONS, "red");
        this.velocityX = 0
        this.velocityY = 0
        this.isGrounded = true
        this.alive = true
        this.score = 0
    }

    handleCollisions() {
        //Ground
        if (this.lastBB.bottom > FRAME_HEIGHT) {
            this.setBottomPosY(FRAME_HEIGHT)
            this.velocityY = 0
            this.isGrounded = true
        }
        //Left Side
        if (this.lastBB.left < 0) {
            this.posX = 0
            this.velocityX = 0
        }
        //Right Side
        if (this.lastBB.right > FRAME_WIDTH) {
            this.setRightPosX(FRAME_WIDTH)
            this.velocityX = 0
        }

        GAME_ENGINE.entities.forEach((entity) => {
            if (entity instanceof FallingBlock) {
                if (this.BB.collide(entity.BB)) {
                    if (this.lastBB.bottom <= entity.BB.top) { //was above last
                        //stand on block
                        this.setBottomPosY(entity.BB.top - 0.99)
                        this.velocityY = 0
                        this.isGrounded = true
                    } else if (this.lastBB.left >= entity.BB.right) { //from right
                        this.velocityX = 0
                        this.posX = entity.BB.right + 0.99
                    } else if (this.lastBB.right <= entity.BB.left) { //from left
                        this.velocityX = 0
                        this.setRightPosX(entity.BB.left - 0.99)
                    } else { //was below last
                        // swish and die
                        this.removeFromWorld = true
                    }
                    this.updateBB()
                }
            }
        })
    }

    update() {
        this.updateMovement()
        this.saveLastBB()
        this.updateBB()
        this.handleCollisions()

        if (this.alive) {
            this.score += GAME_ENGINE.clockTick
            this.draw()
        }
    }

    updateMovement() {
        //WASD
        if (GAME_ENGINE.key_right) {
            if (this.velocityX < PLAYER_MAX_HORIZONTAL_VEL) { //clamp speed
                this.velocityX += (PLAYER_ACCEL * GAME_ENGINE.clockTick)
            } else {
                this.velocityX = PLAYER_MAX_HORIZONTAL_VEL
            }
        }
        if (GAME_ENGINE.key_left) {
            if (this.velocityX > -PLAYER_MAX_HORIZONTAL_VEL) { //clamp speed
                this.velocityX -= (PLAYER_ACCEL * GAME_ENGINE.clockTick)
            } else {
                this.velocityX = -PLAYER_MAX_HORIZONTAL_VEL
            }
        }
        if (GAME_ENGINE.key_up) {
            if (this.isGrounded) {
                this.velocityY = -PLAYER_JUMP_VEL
                this.isGrounded = false
            }
        }
        if (GAME_ENGINE.key_down) {
            this.velocityY += PLAYER_GROUND_POUND_ADDITIONAL_ACCEL * GAME_ENGINE.clockTick
        }

        //Friction
        if (this.velocityX > 0) {
            this.velocityX -= PLAYER_FRICTION * GAME_ENGINE.clockTick
        } else if (this.velocityX < 0) {
            this.velocityX += PLAYER_FRICTION * GAME_ENGINE.clockTick
        }
        if (!GAME_ENGINE.key_right && !GAME_ENGINE.key_left &&
            this.velocityX < 0.01 && this.velocityX > -0.01) { //make fully stop
            this.velocityX = 0
        }
        //Gravity
        if (this.velocityY >= -PLAYER_TERMINAL_FALL_VEL) {
            this.velocityY += PLAYER_GRAVITY * GAME_ENGINE.clockTick
        }

        //Accum Move
        this.posX += this.velocityX * GAME_ENGINE.clockTick
        this.posY += this.velocityY * GAME_ENGINE.clockTick

        // console.log(this.velocityY)
    }

    resetScore() {
        this.score = 0
    }
}