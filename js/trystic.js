
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
/*
var ZONE_HEIGHT;
var HAND;
var ZONE_0;
var ZONE_1;
var DISPLAY;
var DECK;
var DISCARD;
var PORTRAIT;

window.onload = function()
{
	WIDTH = window.innerWidth || 1366;
	HEIGHT = window.innerHeight || 768;
	const config = {
	        type: Phaser.AUTO,
	        width: WIDTH,
	        height: HEIGHT,
	        scene: [GameBoard]
	    };

	ZONE_HEIGHT = HEIGHT/6;
	HAND = {
		x: WIDTH/2,
		y: 0,
		w: WIDTH*0.4,
	};

	ZONE_0 = {
		x: WIDTH/2,
		y: 0.18*HEIGHT,
		w: 0.7*WIDTH,
	};

	ZONE_1 = {
		x: WIDTH/2,
		y: 0.39*HEIGHT,
		w: 0.7*WIDTH,
	};

	DISPLAY = {
		arousal: HEIGHT/2 - 50,
		dominance: HEIGHT/2 - 80,
		allure: HEIGHT/2 - 110,
		perversion: HEIGHT/2 - 140,
		x: 25,
	};

	DECK = {
		x: 0.07*WIDTH,
		y: ZONE_0.y,
		w: ZONE_HEIGHT*3/4
	};

	DISCARD = {
		x: DECK.x,
		y: ZONE_1.y,
		w: ZONE_HEIGHT*3/4
	};
	PORTRAIT = {
		x: 0.95*WIDTH,
		y: 0.1*HEIGHT,
		w: 0.2*WIDTH,
		h: 0.2*WIDTH,
	}
	const game = new Phaser.Game(config);
};
*/
// test bed

var config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: {
        preload: preload,
        create: create
    }
};

class Test extends Phaser.GameObjects.Sprite
{
	constructor(scene, x, y)
	{
		super(scene,x,y,'card');
		this.setTint("0x00ff00");
		scene.add.existing(this);
		this.setInteractive();

		this.targeting = false;

		this.on('pointerdown', function()
		{
			console.log("clicked the card");
			this.targeting = true;
			this.setTint("0xff0000");
		});
		scene.events.on('rightClick', function()
		{
			this.targeting = false;
			this.setTint("0x00ff00");
		},this);
	}
};

var GAME = new Phaser.Game(config);

function preload()
{
	this.load.image('card','img/card.png');
}

function create()
{
	this.input.on('pointerdown',function(pointer)
	{
		if (pointer.rightButtonDown())
		{
			console.log("rightClick");
			this.events.emit('rightClick',pointer);
		}
	},this);

	let obj = new Test(this, WIDTH/2, HEIGHT/2);
}
