import Phaser from 'phaser'

var config = { scene: { create, update } }

const speed = 5

let keyW
let keyA
let keyS
let keyD
let player = {}
let rosesellers = [{}, {}, {}, {}, {}]
let playerSize = 64
let text
let goalZone = {}

function create() {
  text = this.add.text(100, 100, 'You loose')
  rosesellers = rosesellers.map(_ => ({
    rect: new Phaser.Geom.Rectangle(
      Math.random() * 900,
      Math.random() * 700,
      playerSize,
      playerSize
    )
  }))
  rosesellers.forEach((roseseller, i) => {
    roseseller.graphics = this.add.graphics({
      fillStyle: { color: 0x666666 }
    })
    roseseller.graphics.fillRectShape(roseseller.rect)
  })
  player.rect = new Phaser.Geom.Rectangle(
    Math.random() * 900,
    Math.random() * 700,
    playerSize,
    playerSize
  )
  player.graphics = this.add.graphics({
    fillStyle: { color: 0xffffff }
  })
  player.graphics.fillRectShape(player.rect)
  goalZone.rect = new Phaser.Geom.Rectangle(
    Math.random() * 900,
    Math.random() * 700,
    playerSize,
    playerSize
  )
  goalZone.graphics = this.add.graphics({
    fillStyle: { color: 0x00ff00 }
  })
  goalZone.graphics.fillRectShape(goalZone.rect)

  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
}

function moveRect(rect, graphics, direction, speed = 1) {
  switch (direction) {
    case 'up':
      rect.y = Math.max(rect.y - speed, 0)
      break
    case 'down':
      rect.y = Math.min(rect.y + speed, 768 - playerSize)
      break
    case 'left':
      rect.x = Math.max(rect.x - speed, 0)
      break
    case 'right':
      rect.x = Math.min(rect.x + speed, 1024 - playerSize)
      break
    default:
      console.error('Wrong direction provided!')
  }
  graphics.clear()
  graphics.fillRectShape(rect)
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

const isCollision = (react1, rect2) =>
  (react1.x > rect2.x &&
    react1.x < rect2.x + playerSize &&
    react1.y > rect2.y &&
    react1.y < rect2.y + playerSize) ||
  (react1.x + playerSize > rect2.x &&
    react1.x + playerSize < rect2.x + playerSize &&
    react1.y + playerSize > rect2.y &&
    react1.y + playerSize < rect2.y + playerSize) ||
  (react1.x > rect2.x &&
    react1.x < rect2.x + playerSize &&
    react1.y + playerSize > rect2.y &&
    react1.y + playerSize < rect2.y + playerSize) ||
  (react1.x + playerSize > rect2.x &&
    react1.x + playerSize < rect2.x + playerSize &&
    react1.y > rect2.y &&
    react1.y < rect2.y + playerSize)

function update() {
  rosesellers.forEach(seller =>
    moveRect(seller.rect, seller.graphics, randomDirection(), randomSpeed())
  )

  if (rosesellers.some(seller => isCollision(player.rect, seller.rect))) {
    text.setText('You loose')
  } else {
    text.setText('')
  }

  if (isCollision(player.rect, goalZone.rect)) {
    text.setText('You win')
  }

  if (keyW.isDown) {
    moveRect(player.rect, player.graphics, 'up', speed)
  }
  if (keyA.isDown) {
    moveRect(player.rect, player.graphics, 'left', speed)
  }
  if (keyS.isDown) {
    moveRect(player.rect, player.graphics, 'down', speed)
  }
  if (keyD.isDown) {
    moveRect(player.rect, player.graphics, 'right', speed)
  }
}

new Phaser.Game(config)
