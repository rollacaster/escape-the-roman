import Phaser from 'phaser'

var config = { scene: { preload, create, update } }
const game = new Phaser.Game(config)

const speed = 5

let keyW
let keyA
let keyS
let keyD
let player = {}
let rosesellers = []
let rosesellerAmount = 5
let playerSize = 64
let text
let goalZone = {}

function preload() {
  this.load.setBaseURL('http://labs.phaser.io')

  this.load.image('roseseller', 'assets/sprites/50x50.png')
  this.load.image('player', 'assets/sprites/50x50-white.png')
  this.load.image('goal', '"assets/sprites/50x50-black.png')
}

function create() {
  text = this.add.text(100, 100, 'You loose')
  for (let i = 0; i < rosesellerAmount; i++) {
    rosesellers[i] = this.add.image(
      Math.random() * 900,
      Math.random() * 700,
      'roseseller'
    )
  }
  player = this.add.image(Math.random() * 900, Math.random() * 700, 'player')
  goalZone = this.add.image(Math.random() * 900, Math.random() * 700, 'goal')

  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

  var points = [50, 400, 200, 200, 350, 300, 500, 500, 700, 400]

  var curve = new Phaser.Curves.Spline(points)
  var graphics = this.add.graphics()
  graphics.lineStyle(1, 0xffffff, 1)
  curve.draw(graphics)
  var path1 = this.add.follower(curve, 50, 400, {})
  path1.start(4000)
}

function moveRect(rect, direction, speed = 1) {
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
    moveRect(seller, randomDirection(), randomSpeed())
  )

  if (rosesellers.some(seller => isCollision(player, seller))) {
    text.setText('You loose')
  } else {
    text.setText('')
  }

  if (isCollision(player, goalZone)) {
    text.setText('You win')
  }

  if (keyW.isDown) {
    player.y -= speed
  }
  if (keyA.isDown) {
    player.x -= speed
  }
  if (keyS.isDown) {
    player.y += speed
  }
  if (keyD.isDown) {
    player.x += speed
  }
}
