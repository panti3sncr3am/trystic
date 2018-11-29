class DynamicText extends Phaser.GameObjects.Text
{
	constructor(scene, config, text, style)
	{
		super(scene, config.x, config.y, text, style);
		this.w = config.w; this.h = config.h;
		//if (this.style.wordWrapWidth > this.w){this.setWordWrapWidth(this.w);}
		scene.add.existing(this);
		this.setOrigin(0.5);
		if (config.hasOwnProperty("minFontSize"))
		{
			this.minFontSize = config.minFontSize;
		} else {
			this.minFontSize = 10;
		}
		if (config.hasOwnProperty("maxFontSize"))
		{
			this.maxFontSize = config.maxFontSize;
		} else {
			this.maxFontSize = 32;
		}
		if (config.hasOwnProperty("doWordWrap"))
		{
			this.doWordWrap = config.doWordWrap;
		} else {
			this.doWordWrap = true;
		}
		
		this.resize(this.w, this.h);
	}

    rescale(sx, sy)
    {
    	this.scaleX = 1.0/sx; this.scaleY = 1.0/sy;
    	console.log("scaling text to: " + this.scaleX);
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
			if (this.doWordWrap == true)
			{
				this.setWordWrapWidth(w);
			}
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
			if (this.doWordWrap == true)
			{
				this.setWordWrapWidth(w);
			}
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