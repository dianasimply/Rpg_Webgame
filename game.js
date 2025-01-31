const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    parent: 'game-container',
    scene: { preload, create, update },
    physics: { default: 'arcade' }
};

const game = new Phaser.Game(config);
let player;
let cursors;
const tileSize = 32;
let isMoving = false;

function preload() {
    this.load.image('player', 'player.png'); 
}

function create() {
    player = this.physics.add.sprite(0, 0, 'player'); // start pos
    player.setCollideWorldBounds(true); // keep player inside box
    cursors = this.input.keyboard.createCursorKeys(); 
}

let moveDelay = 300; // in ms

function update(time, delta) {
    if (isMoving) return;

    let moveX = 0, moveY = 0;
    if (cursors.left.isDown) moveX = -tileSize;
    else if (cursors.right.isDown) moveX = tileSize;
    else if (cursors.up.isDown) moveY = -tileSize;
    else if (cursors.down.isDown) moveY = tileSize;

    if (moveX !== 0 || moveY !== 0) {
        isMoving = true;
        this.tweens.add({
            targets: player,
            x: player.x + moveX,
            y: player.y + moveY,
            duration: 200, 
            onComplete: () => {
                isMoving = false;
                this.time.delayedCall(moveDelay, () => {}, [], this); 
            }
        });
    }
}
