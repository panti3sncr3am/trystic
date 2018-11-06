class CardZone extends Phaser.GameObjects.Container
{
	constructor(config)
	{
		super(config.scene, config.x, config.y);
		this.type = "CardZone";
		this.id = config.id;

		this.splayCards = config.splayCards;

		if (config.texture)
		{
			this.texture = config.scene.add.sprite(0,0,config.texture);
			this.texture.setDisplaySize(config.w, config.h);
			this.add(this.texture);
		}
		this.setSize(config.w, config.h);
		this.w = config.w;
		this.h = config.h;
		this.scene.add.existing(this);

		this.outline = this.scene.add.graphics();
		this.outline.strokeRect(config.x - config.w/2, config.y - config.h/2,
								config.w, config.h);

		this.cards = [];
		this.depth = 0;
	}

	addCard(card, index = 0)
	{
		if (card.zone == this){return;}
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
		if (card.zone == this)
		{
			this.cards.splice(card.zoneIndex,1);
			this.remove(card);
			this.updateCards();
		}
	}

	updateCards()
	{
		for (var jj = 0; jj < this.cards.length; jj++)
		{
			this.cards[jj].zoneIndex = jj;
			this.cards[jj].x = 0;
		}
		if (this.splayCards)
		{
			let delta = this.w/(this.cards.length + 1);
			for (var ii = 0; ii < this.cards.length; ii++)
			{
				this.cards[ii].x = (- this.w/2) + (ii+1)*delta;
				this.cards[ii].y = 0;
				this.bringToTop(this.cards[ii]);
			}
		}
	}
}