//7tv api requests
async function getSevenTVEmotes(emoteSetId){
  const data = await fetch(`https://7tv.io/v3/emote-sets/${emoteSetId}`);
  const jsonify = await data.json();
  return jsonify.emotes;
}

async function getBttvEmotes(platform, channel){
  fetch(`https://api.ivr.fi/v2/twitch/user?login=${channel}`)
    .then(res => res.json())
    .then(data => {
      const userId = data.id;
      return fetch(`https://api.betterttv.net/3/cached/users/twitch/${userId}`);})
    .then(res.json())
}

