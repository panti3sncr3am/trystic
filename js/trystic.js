var WIDTH;
var HEIGHT;
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

// test bed
/*
var config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: {
        preload: preload,
        create: create
    }
};

class TestCard extends Phaser.GameObjects.Sprite
{
	constructor(scene, x, y)
	{
		super(scene,x,y,'card');
		this.setTint("0x00cc00");
		scene.add.existing(this);

		this.targeting = false;
		this.on('pointerdown', function()
		{
			console.log("clicked the card");
			this.targeting = true;
			this.setTint("0x00ff00");
		});
		this.on('rightClick', function()
		{
			this.targeting = false;
			this.setTint("0x00cc00");
		})
	}
};

class Target extends Phaser.GameObjects.Sprite
{
	constructor(scene, x, y)
	{
		super(scene, x, y, 'card');
		this.setTint("0xcc0000");
		scene.add.existing(this);
	}
}
var GAME = new Phaser.Game(config);

function preload()
{
	this.load.image('card','img/card.png');
	this.load.image('portrait','img/portrait.png');
}

function create()
{
	this.input.on('pointerup',function(pointer)
	{
		if (pointer.rightButtonDown())
		{
			GAME.emit('rightClick',pointer);
		}
	});

	let card = new TestCard(this, WIDTH/3, HEIGHT/2);
	let target = new Target(this, 2*WIDTH/3, HEIGHT/2);
}
*/