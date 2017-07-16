# spotibot
Displays your current track from Spotify as your game in Discord!

![Member List Preview](https://i.digitalism.io/2moQOJCnYv.png)

![User Information Preview](https://i.digitalism.io/c3drk5MVdJ.png)

## How to install
First you will need NodeJS installed on your PC - You can get it at [nodejs.org](https://nodejs.org) (Version 6 is perfectly fine and recommended)

Next, you will need to copy your Discord client login token from your desktop app/browser:

- Press `Ctrl+Shift+I` to open the Developer Tools or go to `View > Developer > Developer tools`
- Click on the "Application" tab on the right side (this may be hidden, just press the ">>" button and it should be in the list)
- On the left sidebar, click the arrow to the left of "Local storage" and then click the entry with `discordapp.com`
- Double-click the data to the left of the "token" field and copy (Ctrl+C) it to your clipboard. **DO NOT SHARE THIS TOKEN!**
- Pase the token in `config.json` in the `token` field. Make sure to remove any extra double quotation marks that appear.
- Run `install.bat` on Windows, or on Linux/Mac open a terminal in the spotibot directory and run `npm install`
- Once that process completes, make sure Spotify is open and a song is playing, and run `run.bat` on Windows or `node bot.js` on Linux/Mac!

To close out of the bot while it's running, just press `Ctrl+C` in the Terminal/Command Prompt window!

## Configuration
spotibot's configuration file (`config.json`) has a few different settings you can change to personalize the bot.

`prefix` - The prefix needed to run commands in the client. This can be any single character. (Avoid using `@`)
`enabled_extensions` - This list defines what extensions to use when running the bot. A few extensions come pre-packaged with spotibot, and more extensions can be added as needed.

## Extending spotibot
spotibot can load extensions from the `./extensions` folder. These are simple JS modules that provide additional functionality to spotibot. For example, `songinfo.js` allows you to send an embed to the current channel with your current track information in addition to the album art of the song.

All extensions should follow the same naming schemes and principles shown in the provided extensions, otherwise they will not be called when needed!

## Known Issues
- Bot crashing when user is on a private session on Spotify.
- Bot crashing when streamer mode is on within discord.
- The bot will not show you as playing the current song on Spotify on your own discord client, however other people will see it.

## Credits
Disclaimer: spotibot is a recreation of [wsmigielski's own DiscordSpotifyBot project](https://github.com/wsmigielski/DiscordSpotifyBot) which was initially extended on and eventually rewritten. If you like this project then make sure to head on over to his project and give it a like!

spotiboy utilizes the following packages to function:
- [discord.js](https://discord.js.org)
- [lyric-get](https://github.com/rhnvrm/lyric-api)
- [node-spotify-webhelper](https://github.com/nadavbar/node-spotify-webhelper)
- [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node)