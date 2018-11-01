
class Card extends Phaser.GameObjects.Container
{
	constructor(scene, x, y, config)
	{
		//constructor and setup

		let H = scene.cardHeight;
		let W = scene.cardWidth;
		
		super(scene,x,y);
		this.setSize(W,H);
		scene.add.existing(this);
		this.setInteractive();
		scene.input.setDraggable(this);
		
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
		this.zoneIndex = -1; //by default not in a zone

		//events
		this.on('pointerdown', this.onClick);
		this.on('drag',this.onDrag);
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
		console.log(this);
		this.back.visible = !this.back.visible;
	}

	onDrag (pointer)
	{
		this.scaleX = 1;
		this.scaleY = 1;
		let deltaX = 0;
		let deltaY = 0;
		if (this.parentContainer)
		{
			deltaX = this.parentContainer.x;
			deltaY = this.parentContainer.y;
		}
		this.x = pointer.x - deltaX;
		this.y = pointer.y - deltaY;
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
		if (this.zone == target)
		{
			this.onDragEnd(pointer);
			if (target.texture)
			{
				target.texture.clearTint();
			}
			return;
		}
		if (this.zoneIndex >= 0)
		{
			this.zone.removeCard(this);
		}
		target.addCard(this);
		if (target.texture)
		{
			target.texture.clearTint();
		}
		console.log(target.cards);
	}
	
	onFocus(pointer)
	{
		if (this.back.visible){return;}
		this.scene.children.bringToTop(this);
		
		let tween = this.scene.tweens.add(
		{
			targets: this,
			scaleX: 2,
			scaleY: 2,
			duration: this.zoomSpeed, 
			onComplete: this.resizeText
		});
	}
	onBlur(pointer)
	{
		this.scene.tweens.add({
			targets: this,
			scaleX: 1,
			scaleY: 1, 
			duration: this.zoomSpeed,
			onComplete: this.resizeText
		});
		
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
}

	