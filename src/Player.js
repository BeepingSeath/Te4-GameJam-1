import Projectile from './Projectile.js'
import Sprite from './assets/sprites/BlackCat.png'

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 24
    this.height = 24
    this.sprite = new Image()
    this.sprite.src = Sprite 
    this.x = this.game.width / 2 - this.width / 2
    this.y = this.game.height / 2 - this.height / 2
    this.color = '#f00'

    this.projectiles = []

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 6

    this.maxAmmo = Infinity
    this.ammo = 20
    this.ammoTimer = 0
    this.ammoInterval = Infinity

    this.shots = 1
    this.lives = 10
    this.damage = 1
  }

  update(deltaTime) {

    // Player Death
    if (this.lives <= 0) {
      this.game.gameOver = true
    }

    // Player Bounds
    if (this.x < 0){
      this.x = this.game.width
    }
    if (this.x > this.game.width){
      this.x = 0
    }
    if (this.y < 0){
      this.y = this.game.height
    } 
    if (this.y > this.game.height){
      this.y = 0
    }

    // Player movement
    if (this.game.keys.includes('ArrowLeft') || this.game.keys.includes('a')) {
      this.speedX = -this.maxSpeed
    } else if (
      this.game.keys.includes('ArrowRight') ||
      this.game.keys.includes('d')
    ) {
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }

    if (this.game.keys.includes('ArrowUp') || this.game.keys.includes('w')) {
      this.speedY = -this.maxSpeed
    } else if (
      this.game.keys.includes('ArrowDown') ||
      this.game.keys.includes('s')
    ) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }

    this.y += this.speedY
    this.x += this.speedX

    if (this.ammoTimer > this.ammoInterval && this.ammo < this.maxAmmo) {
      this.ammoTimer = 0
      this.ammo += 1
    } else {
      this.ammoTimer += deltaTime
    }

    // projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update(deltaTime)
    })
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    )
  }

  draw(context) {
    context.fillStyle = this.color
    context.drawImage(this.sprite, this.x, this.y, this.width, this.height)
    if (this.game.debug) {
      context.strokeStyle = '#000'
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.lineWidth = 1
      context.beginPath()
      const dx = this.game.input.mouseX - (this.x + this.width / 2)
      const dy = this.game.input.mouseY - (this.y + this.height / 2)
      const maxLength = 60
      const angle = Math.atan2(dy, dx)
      const x = this.x + this.width / 2 + maxLength * Math.cos(angle)
      const y = this.y + this.height / 2 + maxLength * Math.sin(angle)
      context.moveTo(this.x + this.width / 2, this.y + this.height / 2)
      context.lineTo(x, y)
      context.stroke()
    }

    this.projectiles.forEach((projectile) => {
      projectile.draw(context)
    })
  }

  shoot(mouseX, mouseY) {
    // get angle between player and mouse
    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )

    if (this.ammo > 0) {
      this.color = '#f00'
      this.ammo--
      let i = 0
      while(i < this.shots){
      this.projectiles.push(
        new Projectile(
          this.game,
          this.x - i*10 + this.width / 2,
          this.y - i*10 + this.height / 2,
          angle,
          this.damage
        )
      )
      i++
        }
      if (this.ammo == 0) {
        this.color = '#f40'
      }
    } else {
      this.lives--
      this.projectiles.push(
        new Projectile(
          this.game,
          this.x + this.width / 2,
          this.y + this.height / 2,
          angle,
          this.damage
        )
      )
      console.log('out of ammo')
    }
  }
}
