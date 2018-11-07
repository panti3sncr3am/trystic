var PLAYER;
var OPPONENT;
var HELP;
var GAME;

class GameBoard extends Phaser.Scene {
	constructor() {
		super({key:"GameBoard"});
	}

	preload ()
	{
	    this.load.image('bg', 'img/bg.png');
	    this.load.image('card', 'img/card.png');
	    this.load.image('cardZone','img/card_zone.png');
	    this.load.image('tempCardArt','img/card_img.png');
	    this.load.image('cardBack','img/card_back.png');
	    this.load.image('portrait','img/portrait.png');
	    this.load.json('cardDefs','js/CardDefs.json');
	}

	create ()
	{
		GAME = this;
		//this.input.setTopOnly(true);
		this.cardHeight = HEIGHT/6;
		this.cardWidth = 150/200*this.cardHeight;

	    this.bg = this.add.sprite(WIDTH/2,HEIGHT/2, 'bg');
	   	this.bg.setDisplaySize(WIDTH,HEIGHT);
	    

	   	this.cardDefs = this.cache.json.get('cardDefs').cards;
	   	console.log("I count " + this.cardDefs.length + " types of card");
	   	/*
	   	var text = new DynamicText(this, WIDTH/2, HEIGHT/2, 100,100, 
	   		"TEXT",
	   	{
	   		color: "#ffff00",
	   		fontSize: 32,
	   		fontFamily: "Ariel",
	   		wordWrap: {width: 150, useAdvancedWrap: true}
	   	});
	   	*/
	   	this.decksize = 60;
	   	let decklist = [];
	   	for (var ii = 0; ii < this.decksize; ii++)
	   	{
	   		decklist.push(Math.floor(Math.random()*this.cardDefs.length));
	   	}

	    PLAYER = new Player(this,decklist,0);
	    OPPONENT = new Player(this,decklist,1);
	    HELP = new DynamicText(this,
	    	{
	    		x: WIDTH/2,
				y: HEIGHT/2,
				w: WIDTH*0.7,
				h: HEIGHT*0.05,
				minFontSize: 16,
				maxFontSize: 26
	    	}
	    	, "HERE IS SOME SEXY TEXT",
			{
				fontFamily: 'Ariel',
				fontSize: 16,
				color: '#fff',
				fontStyle: 'bold',
				wordWrap: {width: 0.7*WIDTH, useAdvancedWrap: true}
			});
	    HELP.visible = false;

	    this.targeting = 0;
	    this.input.on('gameobjectdown',function (pointer, gameObject)
	    {
	    	if (pointer.leftButtonDown())
	    	{
	    		console.log(gameObject);
	    		if (!this.targeting)
	    		{
	    			if (gameObject.type == "Card" &&
	    				gameObject.zone.id == "Hand" &&
	    				gameObject.playable())
	    			{
	    				this.targeting = gameObject;
		   				gameObject.base.setTint("0x00cc00");
		   				HELP.setText("Select a Target");
		   				HELP.visible = true;
	    			} else if (gameObject.id == "Deck" )
	    			{
	    				this.owner(gameObject).draw();
	    			}
	   			} else if (this.targeting && (gameObject != this.targeting))
	   			{
	   				let success = this.targeting.play(gameObject);
	   				if (success)
	   				{
	   					this.targeting.base.clearTint();
	   					HELP.visible = false;
	   					this.targeting = 0;
	   				}
	   			}
	    		this.events.emit('clicked', gameObject);
	    	}
	    }, this);
	    this.input.on('pointerdown',function(pointer)
	    {
	    	if (pointer.rightButtonDown())
	    	{
	    		if (this.targeting)
	    		{
	    			HELP.visible = false;
	    			this.targeting.base.clearTint();
	    			this.targeting = 0;
	    		}
	    		this.events.emit('rightClick',pointer);
	    	}
	    }, this);
	    
	  
	}

	update (delta)
	{
	}

	owner(object)
	{
		let playerNum = object.playerNum;
		if (playerNum == 1) {return OPPONENT;}
		else {return PLAYER;}
	}

	opponent(object)
	{
		let playerNum = object.playerNum;
		if (playerNum == 1) {return PLAYER;}
		else {return OPPONENT;}
	}



}
