class Deck extends Phaser.GameObjects.Container
{
	constructor(scene, x, y, decklist)
	{
		let H = scene.cardHeight;
		let W = scene.cardWidth;

		super(scene, x, y);
		this.setSize(W,H);
		scene.add.existing(this);
		this.setInteractive();

		// Display Card Back
		//this.back = scene.add.sprite(0,0,'cardBack');
		//this.add(this.back);
		//this.back.setDisplaySize(W, H);

		for (let ii = 0; ii < decklist.length; ii++)
		{
			let card = new Card(scene, 0, 0, scene.cardDefs[decklist[ii]]);
			card.faceDown();
			this.add(card);
		}
	}

	draw()
	{

	}


}