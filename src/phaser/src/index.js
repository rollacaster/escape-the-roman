import Phaser from 'phaser'

var config = { scene: { create } }

function create() {
  const rect = new Phaser.Geom.Rectangle(32, 32, 64, 64)
  const graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } })
  graphics.fillRectShape(rect)
}

new Phaser.Game(config)
