export default class UserInterface {
  constructor(game) {
    this.game = game
    this.fontSize = 60
    this.fontFamily = 'Arial'
    this.color = 'white'
  }

  draw(context) {
    context.save()
    context.fillStyle = this.color
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'black'

    if (this.game.gameOver) {
      context.textAlign = 'center'
      context.font = `150px ${this.fontFamily}`
      context.fillText(
        'GAME OVER',
        this.game.width / 2,
        this.game.height / 2
      )
      context.font = `60px ${this.fontFamily}`
      context.fillText('Press \'r\' to try again', this.game.width/2, this.game.height/2+95)
      context.fillText(`Score: ${Math.floor(this.game.gameTime * 0.001)}`, this.game.width/2, this.game.height/2-150)
    } else {
      context.textAlign = 'left'
      context.font = `${this.fontSize}px ${this.fontFamily}`
      context.fillText(`Time: ${(this.game.gameTime * 0.001).toFixed(1)}`, 10, 70)
      context.textAlign = 'center'
      context.fillText(`Lives: ${this.game.player.lives}`, this.game.width / 2, 70)
      if (this.game.player.ammo == 0){
        context.fillStyle = '#FF0000'
        context.font = '100px Arial'
      }
      context.fillText(`Ammo: ${this.game.player.ammo}`,this.game.width / 2, 130)
      context.fillStyle = this.color
    }

    // debug
    if (this.game.debug) {
      context.font = `15px Arial`
      context.textAlign = 'right'
      context.fillText(`x: ${this.game.player.x}`, this.game.width - 20, 25)
      context.fillText(`y: ${this.game.player.y}`, this.game.width - 20, 50)
      context.fillText(
        `mouseY: ${this.game.input.mouseY}`,
        this.game.width - 20,
        100
      )
      context.fillText(
        `maxSpeed: ${this.game.player.maxSpeed}`,
        this.game.width - 20,
        125
      )
      context.fillText(
        `enemies: ${this.game.enemies.length}`,
        this.game.width - 20,
        150
      )
      context.fillText(
        `projectiles: ${this.game.player.projectiles.length}`,
        this.game.width - 20,
        175
      )
      context.fillText(
        `projectile_damage: ${this.game.player.damage}`,
        this.game.width - 20,
        200
      )
      context.fillText(
        `kills: ${this.game.kills}`,
        this.game.width - 20,
        225
      )
      context.fillText(`keys: ${this.game.keys}`, this.game.width - 20, 250)
    }

    context.restore()
  }
}
