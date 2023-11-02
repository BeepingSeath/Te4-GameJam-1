import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Pumpkin from './Pumpkin.js'
import Mint from './Mint.js'
import Gumball from './Gumball.js'


export default class Game {
  constructor(width, height, canvasPosition) {
    this.width = width
    this.height = height
    this.canvasPosition = canvasPosition
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.keys = []
    this.gameOver = false
    this.gameBegin = true
    this.gravity = 1
    this.debug = false
    this.gameTime = 0

    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 1000
    this.kills = 0
    this.explode = 0

    this.pickups = []

    this.player = new Player(this)
  }

  update(deltaTime) {
    if (this.gameBegin){
      this.resetGame()
    }
    if (this.enemies.length > 29){
      this.player.lives -= 1
      this.explode += 5
      this.enemies = []
    }
    if (!this.gameOver) {
      this.gameTime += deltaTime
    } else {
      this.enemies = []
      this.enemyInterval = Infinity

    }
    // Create enemies
    if (this.enemyTimer > this.enemyInterval) {
      let x = Math.random() < 0.5 ? 0 : this.width // spawn on left or right edge
      let y = Math.random() < 0.5 ? 0 : this.height // spawn on top or bottom edge
      if (x === 0) {
        y = Math.random() * this.height // if on left edge, randomize y position
      } else if (x === this.width) {
        y = Math.random() * this.height // if on right edge, randomize y position
      } else if (y === 0) {
        x = Math.random() * this.width // if on top edge, randomize x position
      } else {
        x = Math.random() * this.width // if on bottom edge, randomizea x position
      }
      this.enemies.push(new Pumpkin(this, x, y))

      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }
    this.player.update(deltaTime)

    // Enemy collisions, player and projectiles
    this.enemies.forEach((enemy,) => {
      enemy.update(this.player)
      if (this.checkCollision(this.player, enemy)) {
        this.player.lives -= (Math.ceil(enemy.lives / 2))
        enemy.markedForDeletion = true
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          if (enemy.lives > projectile.damage) {
            enemy.lives -= projectile.damage
          } else {
            if (Math.floor(Math.random() * (5 - 1) + 1) == 1) {
              this.createPickup(Mint, this.x, this.y)
            } else if (this.player.ammo == 0) {
              this.createPickup(Mint, this.x, this.y)
            }
            this.kills += 1
            enemy.markedForDeletion = true
            if (this.kills == 5) {
              this.createPickup(Gumball, this.x, this.y)
              this.kills = 0
            }
          }
          projectile.markedForDeletion = true
        }
      })
    })

    // Pickup collisions with player
    this.pickups.forEach((pickup) => {
      if (this.checkCollision(this.player, pickup)) {
        if (pickup.type === 'mint') {
          this.player.ammo += 5
        } else if (pickup.type === 'gumball') {
          console.log(pickup.taste)
          if (pickup.taste < 1) {
            this.player.damage++
          } else if (pickup.taste < 2){
            this.player.lives += 5
          } else if (pickup.taste < 3){
            this.player.shots++
          } else if (pickup.taste < 4){
            this.player.maxSpeed += 1
          } else {
            if (this.player.width > 8 && this.player.height > 8){
              this.player.width *= 0.75
              this.player.height *= 0.75
              } else {
                this.player.lives += 5
              }
          }
        }
        pickup.markedForDeletion = true
      }
    })

    // Filter out enemies and pickups
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
    this.pickups = this.pickups.filter((pickup) => !pickup.markedForDeletion)
  }

  createPickup(pickup, x, y) {
    this.x = Math.random() * (this.width - 0) + 0
    this.y = Math.random() * (this.height - 0) + 0
    this.pickups.push(new pickup(this, x, y))
  }

  resetGame() {
    this.enemyInterval = 1000
    this.player.lives = 10
    this.player.ammo = 20
    this.player.shots = 1
    this.player.damage = 1
    this.player.x = this.width / 2 - this.player.width / 2
    this.player.y = this.height / 2 - this.player.height / 2
    this.gameTime = 0
    this.gameOver = false
    this.gameBegin = false
    this.enemies = []
    this.player.projectiles = []
  }

  draw(context) {
    this.player.draw(context)
    this.enemies.forEach((enemy) => {
      enemy.draw(context)
    })
    this.pickups.forEach((pickup) => {
      pickup.draw(context)
    })
    this.ui.draw(context)
  }

  checkCollision(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
    )
  }
}
