
//global vars these need to be settings.
const channelName = 'kumi'
const sevenTVId = '01H5NB6HD8000E7KD49C195E8P';
const ffzId = '';
const ffz = false;
const bttv = true;
const sevenTV = true;
const globalEmotesOn = false;

let twitchId = '';

// create emote vars.
let globalEmotes = null;
let userEmotes = null;
const emoteMap = new Map();

async function getEmotes(source, service) {
	const emoteArray = await source;
	let url;
	let name;
	for (const emote of emoteArray) {
		try {
			if(service === 'bttv'){
				url = `https://cdn.betterttv.net/emote/${emote.id}/1x`;
				name = emote.code;
			}
			if(service === '7tv'){
				url = `https://cdn.7tv.app/emote/${emote.id}/${emote.data.host.files[2].name}`
				name = emote.name;
			}
			if(service === 'ffz'){
				url = "#";
			}
			emoteMap.set(name, url);
		} catch (error) {
		console.error("Issue converting given ID to image link: " + error);
	}
}
};

async function setInstanceEmotes() {
	const promises = [];
	if(sevenTV === true){
		promises.push(getEmotes(getSevenTVEmotes(sevenTVId), "7tv"));
	}
	if(bttv === true){
		promises.push(getEmotes(getBttvEmotes(twitchId), "bttv"));
	}
	if(ffz === true){
		promises.push(getEmotes(getFfzEmotes(twitchId), "ffz"));
	}
	promises.push(getTwitchEmotes(twitchId));
	await Promise.all(promises);

}

async function init() {
	twitchId = await setChannelId(channelName);
	await setInstanceEmotes();
	console.log(emoteMap);
}
/*
function parseMessage(msg) {
	return msg.match(/(\w+['’]?\w+|[^\s]+)/g).map(word => {
    const cleaned = word.replace(/[^\w'’]+$/g, '');
	console.log(cleaned);
    if (emoteMap.has(cleaned)) {
      const url = emoteMap.get(cleaned);
	  console.log("Adding emote to message: " + msg + ". Emote: " + cleaned);
      return `<img src="${url}" alt="${cleaned}" class="emote" />` + word.slice(cleaned.length);
    }
		return word;
	})
	.join(" ");
}*/
function parseMessage(msg) {
	return msg.match(/\S+/g).map(word => {
		const match = word.match(/^(\w+['’]?\w*|\w+)(\W*)$/);
		if (!match) return word;
		const [_, base, punctuation] = match;
		if (emoteMap.has(base)) {
			const url = emoteMap.get(base);
			return `<img src="${url}" alt="${base}" class="emote" />${punctuation}`;
		}
		return word;
	}).join(" ");
}



// Create Chat Client
const client = new tmi.Client({
	channels: [channelName]
});
client.connect();
const msgList = [];

// Chat messagelimit before disappearing. 
const msgLimit = 3;

// Chat member Colors
const colorArray = [
  { "#ff9980": "#e62e00" },
  { "#99ccff": "#0073e6" },
  {"#66ff66": "#00cc00"},
  {"#ffff66": "#cccc00"},
  {"#ff80d5": "#cc0088"},
];

const randomColor = () => {
  const random = Math.floor(Math.random() * colorArray.length);
  const obj = colorArray[random];
  const key = Object.keys(obj)[0];
  const value = obj[key];
  return [key, value];
};

// Run init.
init();

//Message Instantiation and Parsing
client.on('message', (channel, tags, message, self) => {
	//nothing check, necessary for tmi I think?
	if (self) return;
	const parsed = parseMessage(message);
	const msg = new Message(tags['display-name'], parsed, randomColor());
	msgList.push(msg);
	if(msgList.length > msgLimit){
		const removed = msgList.shift();
		removed.element.remove();
	}

	msgList.forEach((msg, i) => {
		msg.element.classList.remove("scale");
		msg.element.classList.remove("bounce");
		if (i === msgList.length - 1) {
			//With this style I think you could do something that determines how far up the list an item is,
			// The further up it is, the less/more bouncy it gets.
			msg.element.classList.add("scale");
		} else {
			msg.element.classList.add("bounce");
		}
		document.querySelector(".page").appendChild(msg.element);


	});
});


