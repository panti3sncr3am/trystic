function addArousal(player, amount)
{
	player.arousal += amount;
	player.arousalDisplay.update(player.arousal);
}