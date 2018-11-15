function arousalThreshold(args)
{
	console.log("Checking arousal of " + args.targetPlayer);
	let plr = GAME.owner(this);
	let opp = GAME.opponent(this);
	if (args.targetPlayer == "opponent")
	{
		return (opp.arousal >= args.value);
	} else if (args.targetPlayer == "self")
	{
		return (plr.arousal >= args.value);
	}
}