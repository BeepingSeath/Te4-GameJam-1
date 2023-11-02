import Pickup from './Pickup.js'
import Pink from './assets/sprites/PinkGumball.png'
import Green from './assets/sprites/GreenGumball.png'
import Purple from './assets/sprites/PurpleGumball.png'
import Red from './assets/sprites/RedGumball.png'
import Yellow from './assets/sprites/YellowGumball.png'

export default class Gumball extends Pickup {
    constructor(game, x, y) {
        super(game)
        this.width = 64
        this.height = 64
        this.x = x
        this.y = y
        this.sprite = new Image()
        this.taste = (Math.random() * (5 - 0) + 0)
        if (this.taste < 1) {
            this.sprite.src = Pink
        } else if (this.taste < 2){
            this.sprite.src = Green
        } else  if (this.taste < 3){
            this.sprite.src = Purple
        } else if (this.taste < 4){
            this.sprite.src = Red
        } else {
            this.sprite.src = Yellow
        }
        this.type = 'gumball'
    }
}