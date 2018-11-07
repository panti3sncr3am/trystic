function checkTrigger(triggerArgs, eventArgs)
{
	console.log("checking trigger");
	let plr = GAME.owner(this.zone);
	let opp = GAME.opponent(this.zone);

	if (triggerArgs.hasOwnProperty("player"))
	{
		if (triggerArgs.player == "self" &&
			eventArgs.player != plr.playerNum)
		{
			return false;
		} else if (triggerArgs.player == "opponent" &&
				   eventArgs.player == plr.playerNum)
		{
			return false;
		}
	}
	return true;
}

function addArousal(args)
{
	let plr = GAME.owner(this);
	let opp = GAME.opponent(this);

	if (args.targetPlayer == "opponent")
	{
		opp.arousal += args.value;
		opp.arousalDisplay.update(player.arousal);
	} else if (args.targetPlayer == "self"){
		plr.arousal += args.value;
		plr.arousalDisplay.update(player.arousal);
	}	
}