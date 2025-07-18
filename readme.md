- I need emotes to work right now
- Twitch requires you to get some form of Oauth going in order to register channel emotes
- This is done with these steps:
    1. Need a redirect page (twitch-auth.html), opens via twitch OAuth link that I need to find.
    2. Captures token from the URL/let's user copy token manually.
    3. Put token into a settings.json or env file.
    4. Use the token in api calls.

- For BTTV, it should be a bit simpler which I think is why I was trying to implement that first. 
    - BTTV needs ouath token to get the id.

- At this point, I should just make a site for oAuth or something.
- You need a back end app, and front end that gives user a settings.json file.


Other things I can do
- Have opacity decrease after set time.
- Need to add a check if image is loading / if just sent a single emote needs to be larger.