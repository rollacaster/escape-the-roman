import Phaser from 'phaser'

var config = { scene: { create, update } }

const speed = 5

let keyW
let keyA
let keyS
let keyD
let rect
let graphics

function create() {
  rect = new Phaser.Geom.Rectangle(32, 32, 64, 64)
  graphics = this.add.graphics({ fillStyle: { color: 0xffffff } })
  graphics.fillRectShape(rect)
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
}

function update() {
  if (keyW.isDown) {
    rect.y -= speed
    graphics.clear()
    graphics.fillRectShape(rect)
  }
  if (keyA.isDown) {
    rect.x -= speed
    graphics.clear()
    graphics.fillRectShape(rect)
  }
  if (keyS.isDown) {
    rect.y += speed
    graphics.clear()
    graphics.fillRectShape(rect)
  }
  if (keyD.isDown) {
    rect.x += speed
    graphics.clear()
    graphics.fillRectShape(rect)
  }
}

new Phaser.Game(config)
