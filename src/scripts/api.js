//7tv api requests
async function getSevenTVEmotes(emoteSetId){
  const data = await fetch(`https://7tv.io/v3/emote-sets/${emoteSetId}`);
  const jsonify = await data.json();
  return jsonify.emotes;
}

