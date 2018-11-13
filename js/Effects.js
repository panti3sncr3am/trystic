function checkTrigger(triggerArgs, eventArgs)
{
	console.log("checking trigger");
	console.log(triggerArgs);
	console.log(eventArgs);
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
	console.log("plr is " + plr.playerNum);
	console.log("opp is " + opp.playerNum);
	if (args.targetPlayer == "opponent")
	{
		console.log("adding arousal to " + opp.playerNum);
		opp.arousal += args.value;
		opp.arousalDisplay.update(opp.arousal);
		GAME.events.emit("gainArousal",opp);
	} else if (args.targetPlayer == "self"){
		console.log("adding arousal to " + opp.playerNum);
		plr.arousal += args.value;
		plr.arousalDisplay.update(plr.arousal);
		GAME.events.emit("gainArousal",plr);
	}	
}