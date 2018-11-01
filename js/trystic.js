var WIDTH = window.innerWidth || 1366;
var HEIGHT = window.innerHeight || 768;

const config = {
        type: Phaser.AUTO,
        width: WIDTH,
        height: HEIGHT,
        scene: [GameBoard]
    };

const game = new Phaser.Game(config);