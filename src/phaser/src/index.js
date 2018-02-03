import Phaser from 'phaser'

var config = { scene: { create, update } }

const speed = 5

let keyW
let keyA
let keyS
let keyD
let graphics = [null, null, null, null, null]
let player
let playerGraphics
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
    graphics[i] = this.add.graphics({
      fillStyle: { color: 0x666666 }
    })
    graphics[i].fillRectShape(rect)
  })
  player = new Phaser.Geom.Rectangle(
    Math.random() * 600,
    Math.random() * 600,
    64,
    64
  )
  playerGraphics = this.add.graphics({
    fillStyle: { color: 0xffffff }
  })
  playerGraphics.fillRectShape(player)

  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
}

function moveRoseSeller(rosesellerIndex, direction, speed = 1) {
  switch (direction) {
    case 'up':
      rosesellers[rosesellerIndex].y += speed
      break
    case 'down':
      rosesellers[rosesellerIndex].y -= speed
      break
    case 'left':
      rosesellers[rosesellerIndex].x -= speed
      break
    case 'right':
      rosesellers[rosesellerIndex].x += speed
      break
    default:
      console.error('Wrong direction provided!')
  }
  graphics[rosesellerIndex].clear()
  graphics[rosesellerIndex].fillRectShape(rosesellers[rosesellerIndex])
}

const randomDirection = () => {
  const rand = Math.random() * 100
  if (rand <= 25) {
    return 'up'
  } else if (rand <= 50) {
    return 'down'
  } else if (rand <= 75) {
    return 'left'
  } else {
    return 'right'
  }
}

const randomSpeed = () => Math.random() * 10

function update() {
  rosesellers.forEach((_, i) =>
    moveRoseSeller(i, randomDirection(), randomSpeed())
  )

  if (keyW.isDown) {
    console.log(player)
    playerGraphics.clear()
    player.y -= speed

    playerGraphics.fillRectShape(player)
  }
  if (keyA.isDown) {
    playerGraphics.clear()
    player.x -= speed

    playerGraphics.fillRectShape(player)
  }
  if (keyS.isDown) {
    playerGraphics.clear()
    player.y += speed

    playerGraphics.fillRectShape(player)
  }
  if (keyD.isDown) {
    playerGraphics.clear()
    player.x += speed

    playerGraphics.fillRectShape(player)
  }
}

new Phaser.Game(config)
