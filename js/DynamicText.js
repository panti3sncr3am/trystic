class DynamicText extends Phaser.GameObjects.Text
{
	constructor(scene, config, text, style)
	{
		super(scene, config.x, config.y, text, style);
		this.w = config.w; this.h = config.h;
		if (this.style.wordWrapWidth > this.w){this.setWordWrapWidth(this.w);}
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
		
		this.resize(this.w, this.h);
	}

    rescale(sx, sy)
    {
    	this.scaleX = 1.0/sx; this.scaleY = 1.0/sy;
    	this.resize(sx*this.w, sy*this.h);
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