import Enemy from './Enemy.js'
import Sprite from './assets/sprites/Pumpkin.png'

export default class Pumpkin extends Enemy {
  constructor(game, x, y) {
    super(game)
    this.width = 64 + this.game.explode
    this.height = 54 + this.game.explode
    this.sprite = new Image()
    this.sprite.src = Sprite
    this.x = x
    this.y = y
    this.lives = 1 + Math.floor(Math.pow(game.gameTime/10000, 2)) + this.game.explode
    this.speed = Math.floor(7-this.lives) + this.game.explode*4
    if (this.speed < 2){
      this.speed = 2
    }
    this.color = 'orange'
  }

  update(player) {
    const dx = player.x - this.x // calculate the x distance to the player
    const dy = player.y - this.y // calculate the y distance to the player
    const distance = Math.sqrt(dx * dx + dy * dy) // calculate the total distance to the player
    const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
    const speedY = (dy / distance) * this.speed // calculate the y speed towards the player
    this.x += speedX // move the enemy towards the player on the x axis
    this.y += speedY // move the enemy towards the player on the y axis
  }
}
