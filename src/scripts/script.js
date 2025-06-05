
const client = new tmi.Client({
	channels: [ 'ironmouse' ]
});
client.connect();
const msgList = [];
const msgLimit = 3;

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

const container = document.querySelector(".textbox");
client.on('message', (channel, tags, message, self) => {
	if(self) return;
	let parsedMessage = message;
	const emotes = tags.emotes;

	if (emotes) {
		const ranges = [];

		// Collect emote ranges
		for (const id in emotes) {
			emotes[id].forEach(range => {
				const [start, end] = range.split('-').map(Number);
				ranges.push({ start, end, id });
			});
		}

		// Sort ranges in reverse to replace from the end
		ranges.sort((a, b) => b.start - a.start);

		// Replace emote text with image
		ranges.forEach(({ start, end, id }) => {
			const emoteUrl = `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/1.0`;
			const imgTag = `<img src="${emoteUrl}" alt="emote" class="emote">`;
			parsedMessage = 
				parsedMessage.slice(0, start) + imgTag + parsedMessage.slice(end + 1);
		});
	}

	const msg = new Message(tags['display-name'], parsedMessage, randomColor());
	msgList.push(msg);
	console.log(`${tags['display-name']}: ${message}`);
	if(msgList.length > msgLimit){
		const removed = msgList.shift();
		removed.element.remove();
	}

	msgList.forEach((msg, i) => {
		console.log(msg.textHeight);
		const bottomBubbleHeight = msg.textHeight * 0.6;
		const topBubbleHeight = msg.textHeight * 0.8;
		console.log(msg.top);
		if(msg.textHeight > 1){
		msg.top.style.height = topBubbleHeight;
		msg.bottom.style.height = bottomBubbleHeight;
		}
		msg.element.classList.remove("scale");
		msg.element.classList.remove("bounce");
		if(i === msgList.length - 1){
			msg.element.classList.add("scale");
		} else {
			msg.element.classList.add("bounce");
		}
		container.appendChild(msg.element);


	});
});
