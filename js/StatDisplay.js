class StatDisplay extends DynamicText
{
	constructor(scene, config, stat, value=0)
	{
		let color = "#fff"
		if (stat == "Arousal") {color = "#ff33cc"}
		else if (stat == "Dominance") {color = "#f60"}
		else if (stat == "Allure") {color = "#c00"}
		else if (stat == "Perversion") {color = "#062"}
		config.w = WIDTH*0.2;
		config.h = HEIGHT*0.05;
		config.minFontSize = 10;
		config.maxFontSize = 20;
		let style = {
			color: color,
			fontStyle: "bold",
			fontFamily: "sansSerif",
			fontSize: "24px",
			shadowColor: "fff",
			shadowFill: true,
			shadowBlur: 20

		}
		super(scene, config, stat + ": " + value, style);
		this.setOrigin(0,0.5);
		this.stat = stat;
	}

	update(value)
	{
		this.setText(this.stat + ": " + value)
	}
}