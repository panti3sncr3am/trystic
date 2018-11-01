class CardZone extends Phaser.GameObjects.Container
{
	constructor(config)
	{
		super(config.scene, config.x, config.y);

		if (config.texture)
		{
			this.texture = config.scene.add.sprite(0,0,config.texture);
			this.texture.setDisplaySize(config.w, config.h);
			this.add(this.texture);
			
		} else {

		}

		this.setSize(config.w, config.h);
		this.w = config.w;
		this.h = config.h;
		this.scene.add.existing(this);
		this.setInteractive();
		this.input.dropZone = true;
		this.cards = [];
		this.outline = config.scene.add.graphics();
		this.outline.lineStyle(2,0x00ff00,1);
		this.outline.strokeRect(this.x - this.w/2, this.y - this.h/2,
								this.w, this.h);
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
		this.updateCards();
	}

	removeCard(card)
	{
		if (this.parent == this)
		{
			this.cards.splice(card.zoneIndex,1);
			this.updateCards();
		}
	}

	updateCards()
	{
		console.log(this.cards.length);
		let delta = this.w/(this.cards.length + 1);
		for (var ii = 0; ii < this.cards.length; ii++)
		{
			this.cards[ii].zoneIndex = ii;
			this.cards[ii].x = (- this.w/2) + (ii+1)*delta;
			this.cards[ii].y = 0;
		}
	}
}