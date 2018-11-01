class Player
{
	constructor(scene, decklist, playerNum)
	{
		this.playerNum = playerNum;
		this.zones = [];
		let zone0Height = 0.18*HEIGHT;
		let zone1Height = 0.39*HEIGHT;
		if (playerNum == 0) //bottom
		{
			let handConfig = {
		    	scene: scene,
		    	x: WIDTH/2,
		    	y: HEIGHT,
		    	w: 0.7*WIDTH,
		    	h: HEIGHT/6,
		    	//texture: 'cardZone'
		    };
			let config_0 = {
		    	scene: scene,
		    	x: WIDTH/2,
		    	y: HEIGHT - zone0Height,
		    	w: 0.7*WIDTH,
		    	h: HEIGHT/6,
		    	texture: 'cardZone'
		    };
		    let config_1 = {
		    	scene: scene,
		    	x: WIDTH/2,
		    	y: HEIGHT - zone1Height,
		    	w: 0.7*WIDTH,
		    	h: HEIGHT/6,
		    	texture: 'cardZone'
		    };
		    this.zones.push(new CardZone(config_0));
			this.zones.push(new CardZone(config_1));
		    this.deck = new Deck(scene, 0.9*WIDTH, 7*HEIGHT/8, decklist);
			this.hand = new CardZone(handConfig);
		} else if (playerNum == 1) //top
		{
			let handConfig = {
		    	scene: scene,
		    	x: WIDTH/2,
		    	y: 0,
		    	w: 0.7*WIDTH,
		    	h: HEIGHT/6,
		    	//texture: 'cardZone'
		    };
			let config_0 = {
		    	scene: scene,
		    	x: WIDTH/2,
		    	y: zone0Height,
		    	w: 0.7*WIDTH,
		    	h: HEIGHT/6,
		    	texture: 'cardZone'
		    }
		    let config_1 = {
		    	scene: scene,
		    	x: WIDTH/2,
		    	y: zone1Height,
		    	w: 0.7*WIDTH,
		    	h: HEIGHT/6,
		    	texture: 'cardZone'
		    }
		    this.zones.push(new CardZone(config_0));
			this.zones.push(new CardZone(config_1));
		    this.deck = new Deck(scene, 0.1*WIDTH, HEIGHT/8, decklist);
		    this.hand = new CardZone(handConfig);
		}
	}
}