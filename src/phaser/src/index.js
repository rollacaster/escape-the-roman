import Phaser from 'phaser'

var config = { scene: { create, update } }

const speed = 5

let keyW
let keyA
let keyS
let keyD
let graphics
let player
let rosesellers = [null, null, null, null, null]

function create() {
  rosesellers = rosesellers.map(
    _ =>
      new Phaser.Geom.Rectangle(
        Math.random() * 600,
        Math.random() * 600,
        64,
        64
      )
  )
  rosesellers.forEach((rect, i) => {
    graphics = this.add.graphics({
      fillStyle: { color: 0x666666 }
    })
    graphics.fillRectShape(rect)
  })
  player = new Phaser.Geom.Rectangle(
    Math.random() * 600,
    Math.random() * 600,
    64,
    64
  )
  graphics = this.add.graphics({
    fillStyle: { color: 0xffffff }
  })
  graphics.fillRectShape(player)

  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
}

function update() {
  if (keyW.isDown) {
    player.y -= speed
    graphics.clear()
    graphics.fillRectShape(player)
  }
  if (keyA.isDown) {
    player.x -= speed
    graphics.clear()
    graphics.fillRectShape(player)
  }
  if (keyS.isDown) {
    player.y += speed
    graphics.clear()
    graphics.fillRectShape(player)
  }
  if (keyD.isDown) {
    player.x += speed
    graphics.clear()
    graphics.fillRectShape(player)
  }
}

new Phaser.Game(config)
