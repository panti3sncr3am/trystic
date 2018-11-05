class Deck extends Phaser.GameObjects.Container
{
	constructor(scene, x, y, decklist, playerNum)
	{
		let H = scene.cardHeight;
		let W = scene.cardWidth;

		super(scene, x, y);
		this.type = "Deck";
		this.setSize(W,H);
		scene.add.existing(this);
		this.setInteractive();
		this.playerNum = playerNum;
		this.cards = [];

		// Display Card Back
		//this.back = scene.add.sprite(0,0,'cardBack');
		//this.add(this.back);
		//this.back.setDisplaySize(W, H);

		for (let ii = 0; ii < decklist.length; ii++)
		{
			let card = new Card(scene, 0, 0,
							    scene.cardDefs[decklist[ii]],
							    playerNum);
			card.faceDown();
			this.shuffle(card);
		}

		this.on('pointerdown',this.draw);
	}

	addCard(card,index=0)
	{
		if (index) 
		{
			this.cards.splice(index,0,card);
		} else {
			this.cards.push(card);
		}
		this.add(card);
		card.zone = this;
	}


	draw()
	{
		let card = this.cards.splice(0,1)[0];
		this.remove(card);

		card.faceUp();
		card.setInteractive();
		this.scene.input.setDraggable(card);
		let player = this.scene.getPlayer(this.playerNum);
		player.hand.addCard(card);
	}

	shuffle(card, index)
	{
		if (card)
		{
			// shuffle card into the deck
			if (index) 
			{
				this.cards.splice(index,0,card);
			} else {
				let index = Math.floor(Math.random()*this.cards.length);
				this.cards.splice(index,0,card);
			}
			this.add(card);
			card.zone = this;
		} else {
			// shuffle the deck
			for (var ii = 0; ii < cards.length; ii++)
			{
				let j = Math.floor(Math.random()*this.cards.length);
				let k = Math.floor(Math.random()*this.cards.length);
				let temp = this.cards[j];
				this.cards[j] = this.cards[k];
				this.cards[k] = this.cards[j];
			}
		}
	}
};

class Discard extends Phaser.GameObjects.Container
{
	constructor(scene, x, y, playerNum)
	{
		let H = scene.cardHeight;
		let W = scene.cardWidth;

		super(scene, x, y);
		this.type = "Discard";
		this.setSize(W,H);
		scene.add.existing(this);
		this.setInteractive();
		this.playerNum = playerNum;
		this.cards = [];

		this.outline = scene.add.graphics();
		this.outline.lineStyle(2,0x00ff00,1);
		this.outline.strokeRect(this.x - this.w/2, this.y - this.h/2,
								this.w, this.h);
	}

	discard(card)
	{
		if (card.zone != this)
		{
			this.cards.push(card)
			this.add(card);
			card.zone.removeCard(card);
			card.zone = this;
			card.setInteractive(false);
		}
	}
};
