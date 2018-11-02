class Deck extends Phaser.GameObjects.Container
{
	constructor(scene, x, y, decklist, player)
	{
		let H = scene.cardHeight;
		let W = scene.cardWidth;

		super(scene, x, y);
		this.setSize(W,H);
		scene.add.existing(this);
		this.setInteractive();
		this.player = player;
		this.cards = [];

		// Display Card Back
		//this.back = scene.add.sprite(0,0,'cardBack');
		//this.add(this.back);
		//this.back.setDisplaySize(W, H);

		for (let ii = 0; ii < decklist.length; ii++)
		{
			let card = new Card(scene, 0, 0, scene.cardDefs[decklist[ii]]);
			card.faceDown();
			this.addCard(card);
		}

		this.on('pointerdown',this.draw);
	}

	draw()
	{
		let card = this.cards.splice(0,1)[0];
		this.remove(card);

		card.faceUp();
		card.setInteractive();
		this.scene.input.setDraggable(card);
		this.player.hand.addCard(card);
		console.log(this.cards.length + " left in deck");
	}

	addCard(card, index = 0)
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

}