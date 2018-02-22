import Phaser from 'phaser'

var config = {
  scene: { preload, create, update },
  physics: {
    default: 'arcade'
  }
}
new Phaser.Game(config)

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
  this.load.image('goal', 'assets/sprites/128x128.png')
}

function create() {
  this.physics.world.setBoundsCollision()

  text = this.add.text(100, 100, 'You loose')
  for (let i = 0; i < rosesellerAmount; i++) {
    const startX = Math.random() * 900
    const startY = Math.random() * 700
    rosesellers[i] = this.add.follower(
      new Phaser.Curves.Spline([
        startX,
        startY,
        Math.random() * 900,
        Math.random() * 700
      ]),
      startX,
      startY,
      'roseseller'
    )
  }
  goalZone = this.add.image(Math.random() * 900, Math.random() * 700, 'goal')
  player = this.physics.add
    .image(Math.random() * 900, Math.random() * 700, 'player')
    .setCollideWorldBounds(true)

  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
}

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
  if (rosesellers.some(seller => isCollision(player, seller))) {
    text.setText('You loose')
  } else {
    text.setText('')
  }

  rosesellers.forEach(roseSeller => {
    if (!roseSeller.isFollowing()) {
      roseSeller.start({
        duration: 500 + Math.random() * 2000,
        yoyo: true
      })
    }
  })

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
