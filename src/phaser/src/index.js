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
let playerSize = 64
let text

function create() {
  text = this.add.text(100, 100, 'You loose')
  rosesellers = rosesellers.map(
    _ =>
      new Phaser.Geom.Rectangle(
        Math.random() * 600,
        Math.random() * 600,
        playerSize,
        playerSize
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
    playerSize,
    playerSize
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

const isLost = (player, rosesellers) =>
  rosesellers.some(
    seller =>
      (player.x > seller.x &&
        player.x < seller.x + playerSize &&
        player.y > seller.y &&
        player.y < seller.y + playerSize) ||
      (player.x + playerSize > seller.x &&
        player.x + playerSize < seller.x + playerSize &&
        player.y + playerSize > seller.y &&
        player.y + playerSize < seller.y + playerSize) ||
      (player.x > seller.x &&
        player.x < seller.x + playerSize &&
        player.y + playerSize > seller.y &&
        player.y + playerSize < seller.y + playerSize) ||
      (player.x + playerSize > seller.x &&
        player.x + playerSize < seller.x + playerSize &&
        player.y > seller.y &&
        player.y < seller.y + playerSize)
  )

function update() {
  rosesellers.forEach((_, i) =>
    moveRoseSeller(i, randomDirection(), randomSpeed())
  )

  if (isLost(player, rosesellers)) {
    text.setText('You loose')
  } else {
    text.setText('')
  }

  if (keyW.isDown) {
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
