export default class Pickup {
    constructor(game, color) {
        this.game = game
        this.width = this.width
        this.height = this.height
        this.x = 0
        this.y = 0
        this.speedX = 0
        this.speedY = 0
        this.markedForDeletion = false
        this.taste = this.taste
        this.sprite = this.sprite
        this.color = color
        this.type = 'pickup'
    }

    draw(context) {
        context.fillStyle = this.color
        context.drawImage(this.sprite, this.x, this.y, this.width, this.height)
        if (this.game.debug) {
            context.fillText(this.type, this.x, this.y - 5)
        }
    }
}