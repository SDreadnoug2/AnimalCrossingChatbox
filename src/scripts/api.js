//7tv api requests
async function getSevenTVEmotes(emoteSetId){
  const data = await fetch(`https://7tv.io/v3/emote-sets/${emoteSetId}`);
  const jsonify = await data.json();
  return jsonify.emotes;
}

async function getBttvEmotes(channel){
  const data = await fetch(`https://api.betterttv.net/3/cached/users/twitch/${channel}`)
  const jsonify = await data.json();
  return jsonify.sharedEmotes.concat(jsonify.channelEmotes);
};

async function setChannelId(channelName) {
  console.log(channelName);
	await fetch(`https://api.ivr.fi/v2/twitch/user?login=${channelName}`)
	.then((data => data.json()))
	.then((data => {
		console.log(data[0].id)
		return data[0].id
	}));
};

async function setChannelId() {
	const res = await fetch(`https://api.ivr.fi/v2/twitch/user?login=${channelName}`)
	const data = await res.json();
	return data[0].id;
};