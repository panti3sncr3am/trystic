
class Card extends Phaser.GameObjects.Container
{
	constructor(scene, x, y, config,playerNum)
	{
		//constructor and setup

		let H = scene.cardHeight;
		let W = scene.cardWidth;
		
		super(scene,x,y);
		this.type = "Card";
		this.cardType = config.cardType;
		this.setSize(W,H);
		scene.add.existing(this);
		
		
		// Card Front Base
		this.base = scene.add.sprite(0,0,'card');
		this.add(this.base);
		this.base.setDisplaySize(W, H);
		

		// Card Art
		this.art = scene.add.sprite(0,-0.15*H,'tempCardArt');
		this.art.setDisplaySize(W*0.9, H*0.9*0.5);
		this.add(this.art);
		this.art.setTint(Phaser.Display.Color.GetColor(
			config.tint[0], config.tint[1], config.tint[2]));

		// Title
		this.titleConfig = {
			x: 0,
			y: -0.85*H/2,
			w: W*0.9,
			h: H*0.1,
			minFontSize: 10,
			maxFontSize: 32
		}
		this.title = new DynamicText(scene, this.titleConfig, config.name,
			{
				fontFamily: 'Ariel',
				fontSize: 32,
				color: '#000000',
				fontStyle: 'bold',
			});
		this.add(this.title);
		// Text
		this.textConfig = {
			x: 0,
			y: H/4,
			w: W*0.9,
			h: H*0.4,
			minFontSize: 8,
			maxFontSize: 18
		}
		this.text = new DynamicText(scene, this.textConfig, config.text,
			{
				fontFamily: 'Ariel',
				fontSize: 16,
				color: '#000000',
				fontStyle: 'bold',
				wordWrap: {width: 0.9*W, useAdvancedWrap: true}
			});
		this.add(this.text);

		this.back = scene.add.sprite(0,0,'cardBack');
		this.add(this.back);
		this.back.setDisplaySize(W, H);
		this.back.visible = false;

		this.zoomSpeed = 200;
		this.zoneIndex = -1;

		//gameplay data
		this.playerNum = playerNum;
		if (config.hasOwnProperty("cost"))
		{
			this.cost = config.cost;
		}
		if (config.target)
		{
			this.target = config.target;
		}
		if (config.requirements)
		{
			this.requirements = config.requirements;
		}
		if (config.effects)
		{
			this.effects = config.effects
		}
		if (config.keywords)
		{
			this.keywords = config.keywords
		}

		//events
		this.on('pointerdown', this.onClick);
		this.on('drag',this.onDrag);
		this.on('dragstart',this.onDragStart);
		this.on('dragend',this.onDragEnd);
		this.on('pointerover',this.onFocus);
		this.on('pointerout',this.onBlur);
		this.on('dragover',this.onDragover);
		this.on('dragenter',this.onDragenter);
		this.on('dragleave',this.onDragleave);
		this.on('drop',this.onDrop);
	}
	
	faceDown()
	{
		this.back.visible = true;
	}

	faceUp()
	{
		this.back.visible = false;
	}

	onClick (pointer)
	{
	}

	onDrag (pointer)
	{
		this.scaleX = 1;
		this.scaleY = 1;

		let deltaX = 0;
		let deltaY = 0;
		
		this.depth = 1000;
		if (this.parentContainer)
		{
			deltaX = this.parentContainer.x;
			deltaY = this.parentContainer.y;
		}

		this.x = pointer.x - deltaX;
		this.y = pointer.y - deltaY;
	}

	onDragStart(pointer, dragX, dragY)
	{
		this.zone.depth = 1000;
	}

	onDragEnd(pointer, dragX, dragY, dropped)
	{

		if (!dropped)
		{
			this.x = this.input.dragStartX;
			this.y = this.input.dragStartY;
		}
	}
	
	onDrop(pointer, target)
	{	
		this.zone.depth = 0;
		if (target.texture)
		{
			target.texture.clearTint();
		}
		
		if (this.zone == target)
		{
			this.onDragEnd(pointer);
			if (target.texture)
			{
				target.texture.clearTint();
			}
			return;
		} else if (this.zone)
		{
			this.zone.removeCard(this);
			target.addCard(this);
		}
	}
	
	onFocus(pointer)
	{
		if (this.back.visible){return;}
		this.zone.bringToTop(this);
		this.scene.children.bringToTop(this);
		this.zone.depth = 1000;
		this.angle = 0;

		// Highlight valid targets
		/*
		if (this.playable())
		{
			this.highlightTarget(this.target, true);
		}
		*/
		let tween = this.scene.tweens.add(
		{
			targets: this,
			scaleX: 2,
			scaleY: 2,
			y: (HEIGHT/2 - this.zone.y)/3,
			duration: this.zoomSpeed, 
			onComplete: this.resizeText
		});
	}
	onBlur(pointer)
	{
		/*
		if (this.playable())
		{
			this.highlightTarget(this.target, false);
		}
		*/
		this.zone.depth = 0;
		this.angle = 180*this.playerNum;
		this.scene.tweens.add({
			targets: this,
			scaleX: 1,
			scaleY: 1, 
			y: 0,
			duration: this.zoomSpeed,
			onComplete: this.resizeText
		});
		this.zone.updateCards();
		
	}
	onDragover(pointer, target)
	{

	}
	onDragenter(pointer, target)
	{
		if (target.texture)
		{
			target.texture.setTint("0x00ff00");
		}
		
	}
	onDragleave(pointer, target)
	{
		if (target.texture)
		{
			target.texture.clearTint();
		}
	}

	resizeText(tween, targets)
	{

		let card = targets[0];
		
		card.title.scaleX = 1.0/card.scaleX;
		card.title.scaleY = 1.0/card.scaleY;
		card.title.resize(card.titleConfig.w*card.scaleX,
						  card.titleConfig.h*card.scaleY);
		card.text.scaleX = 1.0/card.scaleX;
		card.text.scaleY = 1.0/card.scaleY;
		card.text.resize(card.textConfig.w*card.scaleX,
						  card.textConfig.h*card.scaleY);
	}

	playable()
	{
		console.log("Checking playability...");
		let success = true;
		let opp = GAME.opponent(this);
		success &= (opp.arousal >= this.cost);
		console.log("Able to pay cost: " + success);
		for (var ii = 0; ii < this.requirements.length; ii++)
		{
			let fxn = eval(this.requirements[ii].fxn).bind(this,this.requirements[ii].fxnArgs);
			success &= fxn();
			console.log("Passes requirement " + this.requirements[ii].fxn + ": " + success);
		}
		return success;
	}

	highlightTarget(target, flag)
	{
		if (target == "opponent")
		{
			let opponent = this.scene.opponent(this.playerNum);
			opponent.highlightPortrait(flag);
		}
	}

	clearTarget()
	{
	}

	play(target)
	{
		var success = false;
		console.log("tried to play a card");
		var tgt;
		// Target = opponent
		if ((this.target == "opponent") 
			&& (target.id == "Portrait") 
			&& (target.playerNum != this.playerNum))
		{
			tgt = GAME.opponent(this);
			this.resolve(tgt);
			success = true;
		} 
		// Target = player
		else if ((this.target == "player") 
			&& (target.id == "Portrait"))
		{
			tgt = GAME.owner(target);
			console.log("I am " + this.playerNum);
			console.log("my target is " + tgt.playerNum);
			this.resolve(tgt);
			success = true;

		}
		return success;
	}

	resolve(target)
	{
		let opp = GAME.opponent(this);
		opp.arousal -= this.cost;
		opp.arousalDisplay.update(opp.arousal);
		if (this.cardType == "Spell")
		{
			for (var ii = 0; ii < this.effects.length;ii++)
			{
				let fxn = eval(this.effects[ii].fxn).bind(this);
				console.log(fxn);
				console.log(this.effects[ii].fxnArgs);
				fxn(this.effects[ii].fxnArgs);
				GAME.owner(this).discard(this);
			}
		} else if (this.cardType == "Charm"){
			GAME.owner(this).hand.removeCard(this);
			GAME.owner(this).zone1.addCard(this);
			for (var ii = 0; ii < this.effects.length;ii++)
			{
				var fxn = eval(this.effects[ii].fxn).bind(this, this.effects[ii].fxnArgs);
				var check = checkTrigger.bind(this, this.effects[ii].triggerArgs);
				this.scene.events.on(this.effects[ii].trigger, function(eventArgs)
					{
						if (check(eventArgs)){fxn();}			
					});
			}
		}
	}
}

	