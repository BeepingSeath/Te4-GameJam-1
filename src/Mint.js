import Pickup from './Pickup.js'
import Sprite from './assets/sprites/Mint.png'

export default class Mint extends Pickup {
  constructor(game, x, y) {
    super(game)
    this.width = 32
    this.height = 17
    this.x = x
    this.y = y
    this.lives = 1
    this.sprite = new Image()
    this.sprite.src = Sprite
    this.type = 'mint'
  }
}
