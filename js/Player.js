class Player
{
	constructor(scene, decklist, playerNum)
	{
		this.playerNum = playerNum;
		this.zones = [];
		let zone0Height = 0.18*HEIGHT;
		let zone1Height = 0.39*HEIGHT;
		this.arousal = 0;
		this.dominance = 0;
		this.allure = 0;
		this.perversion = 0;
		if (playerNum == 0) //bottom
		{
			let handConfig = {
		    	scene: scene,
		    	x: WIDTH/2,
		    	y: HEIGHT,
		    	w: 0.4*WIDTH,
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
		    this.deck = new Deck(scene, 0.93*WIDTH, HEIGHT - zone0Height, decklist,this);
			this.hand = new CardZone(handConfig);
			this.arousalDisplay = new StatDisplay(scene,
			{
				x: 25,
				y: HEIGHT/2+50,
			}, "Arousal");
			this.dominanceDisplay = new StatDisplay(scene,
			{
				x: 25,
				y: HEIGHT/2+80,
			}, "Dominance");
			this.allureDisplay = new StatDisplay(scene,
			{
				x: 25,
				y: HEIGHT/2+110,
			}, "Allure");
			this.perversionDisplay = new StatDisplay(scene,
			{
				x: 25,
				y: HEIGHT/2+140,
			}, "Perversion");
			this.portrait = scene.add.sprite(WIDTH*0.05, HEIGHT*0.9,'portrait');
			this.portrait.setDisplaySize(WIDTH*0.2,WIDTH*0.2);

		} else if (playerNum == 1) //top
		{
			let handConfig = {
		    	scene: scene,
		    	x: WIDTH/2,
		    	y: 0,
		    	w: 0.4*WIDTH,
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
		    this.deck = new Deck(scene, 0.07*WIDTH, zone0Height, decklist,this);
		    this.hand = new CardZone(handConfig);
		    this.arousalDisplay = new StatDisplay(scene,
			{
				x: WIDTH-25,
				y: HEIGHT/2 - 50,
			}, "Arousal");
			this.dominanceDisplay = new StatDisplay(scene,
			{
				x: WIDTH-25,
				y: HEIGHT/2-80,
			}, "Dominance");
			this.allureDisplay = new StatDisplay(scene,
			{
				x: WIDTH-25,
				y: HEIGHT/2-110,
			}, "Allure");
			this.perversionDisplay = new StatDisplay(scene,
			{
				x: WIDTH-25,
				y: HEIGHT/2-140,
			}, "Perversion");
			this.arousalDisplay.setOrigin(1,0.5);
			this.dominanceDisplay.setOrigin(1,0.5);
			this.allureDisplay.setOrigin(1,0.5);
			this.perversionDisplay.setOrigin(1,0.5);
			this.portrait = scene.add.sprite(WIDTH*0.95, HEIGHT*0.1,'portrait');
			this.portrait.setDisplaySize(WIDTH*0.2,WIDTH*0.2);
		}
	}
}