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
	    this.load.json('cardDefs','js/CardDefs.json');
	    
	}

	create ()
	{
		//this.input.setTopOnly(true);
		this.cardHeight = HEIGHT/6;
		this.cardWidth = 150/200*this.cardHeight;

	    this.bg = this.add.sprite(WIDTH/2,HEIGHT/2, 'bg');
	   	this.bg.setDisplaySize(WIDTH,HEIGHT);
	    
	   	this.cardDefs = this.cache.json.get('cardDefs').cards;
	   	console.log(this.cardDefs);

	   	var text = new DynamicText(this, WIDTH/2, HEIGHT/2, 100,100, 
	   		"TEXT",
	   	{
	   		color: "#ffff00",
	   		fontSize: 32,
	   		fontFamily: "Ariel",
	   		wordWrap: {width: 150, useAdvancedWrap: true}
	   	})
	   	
	   	this.decksize = 60;
	   	let decklist = [];
	   	for (var ii = 0; ii < this.decksize; ii++)
	   	{
	   		decklist.push(Math.floor(Math.random()*this.cardDefs.length));
	   	}

	    var player1 = new Player(this,decklist,0);
	    var player2 = new Player(this,decklist,1);
	}

	update (delta)
	{
	}

}
