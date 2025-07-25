
//global vars these need to be settings.
const channelName = 'kymaniklowni'
const sevenTVId = '01G28935KG0008VANM5HZ9841J';
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



// fetch emotes. Need 3rd party dependent. Has to check if user has an AuthCode.
// If no auth, chatbox shouldn't work, should instead display "please sign in."
async function setInstanceEmotes() {
	if(sevenTV === true){
		const emoteArray = await getSevenTVEmotes(sevenTVId);
		for (const emote of emoteArray){
			try {
				const url = `https://cdn.7tv.app/emote/${emote.id}/${emote.data.host.files[2].name}`
				console.log("7tv emotes: " + emoteArray);
				emoteMap.set(emote.name, url);
			} catch (error) {
			console.error("Issue converting given ID to image link.");
			}
		}
	}
	if(bttv === true){
		const emoteArray = await getBttvEmotes(twitchId);
		console.log(emoteArray);
		
	}
}

async function init() {
	twitchId = await setChannelId(channelName);
	console.log(twitchId);
	await setInstanceEmotes();
}

function parseMessage(msg) {
	return msg.match(/(\w+['’]?\w+|[^\s]+)/g).map(word => {
    const cleaned = word.replace(/[^\w'’]+$/g, '');
    if (emoteMap.has(cleaned)) {
      const url = emoteMap.get(cleaned);
      return `<img src="${url}" alt="${cleaned}" class="emote" />` + word.slice(cleaned.length);
    }
		return word;
	})
	.join(" ");
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


