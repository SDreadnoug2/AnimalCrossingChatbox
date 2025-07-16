- I need emotes to work right now
- Twitch requires you to get some form of Oauth going in order to register channel emotes
- This is done with these steps:
    1. Need a redirect page (twitch-auth.html), opens via twitch OAuth link that I need to find.
    2. Captures token from the URL/let's user copy token manually.
    3. Put token into a settings.json or env file.
    4. Use the token in api calls.

- For BTTV, it should be a bit simpler which I think is why I was trying to implement that first. 