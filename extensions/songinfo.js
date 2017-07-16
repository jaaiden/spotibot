// songinfo.js
// Gets the current song information and returns an embed to the channel
// Created by digital#0781

const https = require('https')
var config = require('../config.json')

var shouldWait = false
setInterval(() => {
  if (shouldWait) { shouldWait = false }
}, config.chat_cooldown)

module.exports = {
  parse: function (spotifyClient, discordClient, messageObject) {
    if (messageObject.content === discordClient.user.username + ', song?' || (messageObject.content === config.prefix + 'song' && messageObject.author.id === discordClient.user.id)) {
      if (!shouldWait) {
        console.log('Requested songinfo')

        spotifyClient.getStatus(function (err, res) {
          if (err) {
            return console.error(err)
          }

          var songUrl = res.track.track_resource.location.og

          var httpsOpt = {
            host: 'open.spotify.com',
            path: '/oembed?url=' + res.track.track_resource.uri,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            timeout: 5000
          }

          var httpsReq = https.request(httpsOpt, (httpsRes) => {
            httpsRes.setEncoding('utf8')
            httpsRes.on('data', (data) => {
              var content = JSON.parse(data)

              // Send embed
              messageObject.channel.send({embed: {
                description: 'by **' + res.track.artist_resource.name + '** from the album ' + res.track.album_resource.name + '\n\nsonginfo from [spotibot](https://github.com/zackdevine/spotibot)',
                title: res.track.track_resource.name,
                url: songUrl,
                color: 8699136,
                footer: {
                  icon_url: 'https://image.flaticon.com/icons/png/512/174/174872.png',
                  text: 'on Spotify'
                },
                thumbnail: {
                  url: content.thumbnail_url
                },
                author: {
                  name: discordClient.user.username + ' is listening to',
                  url: songUrl
                }
              }})
            })
          })

          httpsReq.end()
        })

        shouldWait = true
      } else console.log('Request songinfo - on cooldown')
    }
  }
}
