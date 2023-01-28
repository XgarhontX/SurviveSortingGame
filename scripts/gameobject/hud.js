class HUD extends GameObject {
    constructor(player) {
        super(FRAME_WIDTH/2,200, 0, 0);
        this.player = player
        this.animator = new AnimatorText()
    }

    draw() {
        this.animator.drawFrame(this.posX, this.posY, this.player.score)
    }
}