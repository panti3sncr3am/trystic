class Player extends Phaser.GameObjects.GameObject
{
	constructor(scene, decklist, playerNum)
	{
		super(scene,"Player");
		this.playerNum = playerNum;
		// Create Zones
		this.hand = new CardZone({
	    	scene: scene,
	    	id: "Hand",
	    	splayCards: true,
	    	x: HAND.x*playerNum + (WIDTH - HAND.x)*(1 - playerNum),
	    	y: HAND.y*playerNum + (HEIGHT - HAND.y)*(1 - playerNum),
	    	w: HAND.w,
	    	h: ZONE_HEIGHT,

	    });
		this.zone0 = new CardZone({
	    	scene: scene,
	    	id: "Zone0",
	    	splayCards: true,
	    	x: ZONE_0.x*playerNum + (WIDTH - ZONE_0.x)*(1 - playerNum),
	    	y: ZONE_0.y*playerNum + (HEIGHT - ZONE_0.y)*(1 - playerNum),
	    	w: ZONE_0.w,
	    	h: ZONE_HEIGHT,
	    	texture: 'cardZone'
	    });
	    this.zone1 = new CardZone({
	    	scene: scene,
	    	id: "Zone1",
	    	splayCards: true,
	    	x: ZONE_1.x*playerNum + (WIDTH - ZONE_1.x)*(1 - playerNum),
	    	y: ZONE_1.y*playerNum + (HEIGHT - ZONE_1.y)*(1 - playerNum),
	    	w: ZONE_1.w,
	    	h: ZONE_HEIGHT,
	    	texture: 'cardZone'
	    });
	    this.deck = new CardZone({
	    	scene: scene,
	    	id: "Deck",
	    	splayCards: false,
	    	x: DECK.x*playerNum + (WIDTH - DECK.x)*(1 - playerNum),
	    	y: DECK.y*playerNum + (HEIGHT - DECK.y)*(1 - playerNum),
	    	w: DECK.w,
	    	h: ZONE_HEIGHT,
	    });
	    this.deck.setInteractive();
	    this.discard = new CardZone({
	    	scene: scene,
	    	id: "Discard",
	    	splayCards: false,
	    	x: DISCARD.x*playerNum + (WIDTH - DISCARD.x)*(1 - playerNum),
	    	y: DISCARD.y*playerNum + (HEIGHT - DISCARD.y)*(1 - playerNum),
	    	w: DISCARD.w,
	    	h: ZONE_HEIGHT,
	    });

		this.portrait = scene.add.sprite(PORTRAIT.x*playerNum + (WIDTH - PORTRAIT.x)*(1 - playerNum),
										PORTRAIT.y*playerNum + (HEIGHT - PORTRAIT.y)*(1 - playerNum),
										'portrait');
		this.portrait.setDisplaySize(PORTRAIT.w,PORTRAIT.h);
		this.portrait.id = "Portrait";
		this.portrait.setInteractive();
		this.portrait.playerNum = playerNum;
	    
	    // Create stat display
	    this.arousal = 0;
		this.dominance = 0;
		this.allure = 0;
		this.perversion = 0;
		this.arousalDisplay = new StatDisplay(scene,
		{
			x: DISPLAY.x*(1-playerNum) + (WIDTH - DISPLAY.x)*playerNum,
			y: DISPLAY.arousal*playerNum + (HEIGHT - DISPLAY.arousal)*(1-playerNum)
		}, "Arousal");
		this.arousalDisplay.setOrigin(playerNum,0.5);
		this.dominanceDisplay = new StatDisplay(scene,
		{
			x: DISPLAY.x*(1-playerNum) + (WIDTH - DISPLAY.x)*playerNum,
			y: DISPLAY.dominance*playerNum + (HEIGHT - DISPLAY.dominance)*(1-playerNum)
		}, "Dominance");
		this.dominanceDisplay.setOrigin(playerNum,0.5);
		this.allureDisplay = new StatDisplay(scene,
		{
			x: DISPLAY.x*(1-playerNum) + (WIDTH - DISPLAY.x)*playerNum,
			y: DISPLAY.allure*playerNum + (HEIGHT - DISPLAY.allure)*(1-playerNum)
		}, "Allure");
		this.allureDisplay.setOrigin(playerNum,0.5);
		this.perversionDisplay = new StatDisplay(scene,
		{
			x: DISPLAY.x*(1-playerNum) + (WIDTH - DISPLAY.x)*playerNum,
			y: DISPLAY.perversion*playerNum + (HEIGHT - DISPLAY.perversion)*(1-playerNum)
		}, "Perversion");
		this.perversionDisplay.setOrigin(playerNum,0.5);

		// add cards to deck
		for (var ii = 0; ii < decklist.length; ii++)
		{
			let card = new Card(scene, 0, 0, scene.cardDefs[decklist[ii]], playerNum);
			card.faceDown();
			this.deck.addCard(card);

		}


		this.shuffle();


		// draw staring hand
		for (var ii = 0; ii < 7; ii++)
		{
			this.draw();
		}
		console.log(this.deck);
		//this.draw(7);

	} //end constructor

	shuffle(card,index)
	{
		let cards = this.deck.cards;
		if (card)
		{
			// shuffle card into the deck
			if (index) 
			{
				cards.splice(index,0,card);
			} else {
				let index = Math.floor(Math.random()*cards.length);
				cards.splice(index,0,card);
			}
			this.deck.add(card);
			card.zone = this;
		} else {
			// shuffle the deck
			for (var ii = 0; ii < cards.length; ii++)
			{
				let j = Math.floor(Math.random()*cards.length);
				let k = Math.floor(Math.random()*cards.length);
				let temp = cards[j];
				cards[j] = cards[k];
				cards[k] = cards[j];
			}
		}
	}

	draw(N = 1)
	{
		for (var ii = 0; ii < N; ii++)
		{
			//console.log(this.deck.cards);
			let card = this.deck.cards.splice(0,1)[0];
			console.log(card);
			this.deck.remove(card);
			this.hand.addCard(card);
			card.faceUp();
			card.setInteractive();
			//console.log("drew card: " + card);
			//console.log("deck has " + this.deck.cards.length + " cards left");
		}
	}
};