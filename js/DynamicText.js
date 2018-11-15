class DynamicText extends Phaser.GameObjects.Text
{
	constructor(scene, config, text, style)
	{
		super(scene, config.x, config.y, text, style);
		let w = config.w; let h = config.h;
		if (this.style.wordWrapWidth > w){this.setWordWrapWidth(w);}
		scene.add.existing(this);
		this.setOrigin(0.5);
		if (config.minFontSize)
		{
			this.minFontSize = config.minFontSize;
		} else {
			this.minFontSize = 10;
		}
		if (config.maxFontSize)
		{
			this.maxFontSize = config.maxFontSize;
		} else {
			this.maxFontSize = 32;
		}
		
		/*
		this.bounds = scene.add.graphics();
		scene.add.existing(this.bounds);
		this.bounds.lineStyle(1, 0xff0000, 1);
		
		this.box = scene.add.graphics();
		scene.add.existing(this.box);
		this.box.lineStyle(1, 0x00ff00, 1);
		*/
		this.resize(w, h);
	}

	resize(w, h)
	{
		let bounds = this.getBounds();
		let H = bounds.height;
		let W = bounds.width;
		let finished = false;
		if (bounds.height < h && bounds.width < w)
		{
			this.setWordWrapWidth(w);
			while (!finished)
			{
				let fontSize = parseInt(this.style.fontSize.slice(0,-2));
				fontSize = fontSize + 2;
				if (fontSize > this.maxFontSize){break;}
				this.setFontSize(fontSize);
				bounds = this.getBounds();
				if ((bounds.height > h) || (bounds.width > w))
				{
					this.setFontSize(fontSize - 2);
					finished = true;
				}
			}
		} else {
			this.setWordWrapWidth(w);
			while (!finished)
			{
				let fontSize = parseInt(this.style.fontSize.slice(0,-2));
				fontSize = fontSize - 2;
				if (fontSize < this.minFontSize){break;}
				this.setFontSize(fontSize);
				bounds = this.getBounds();
				if (bounds.height < h && bounds.width < w){finished = true;}
			}
		}
	}
}