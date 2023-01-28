class HUD extends GameObject {
    constructor(player) {
        super(FRAME_WIDTH/2,200, 0, 0);
        this.player = player
        this.animator = new AnimatorText()
        this.lose = false
    }

    draw() {
        this.animator.drawFrame(this.posX, this.posY, Math.floor(SCENE_MANAGER.player.score))
        if (this.lose) {
            this.animator.drawFrame(this.posX, this.posY + 250, 'RIP, process return code -1. R to restart', 'black', 'bold 20px Arial')
        }
    }
}