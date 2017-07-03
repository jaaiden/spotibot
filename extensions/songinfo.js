// songinfo.js
// Gets the current song information and returns an embed to the channel
// Created by digital#0781

const https = require('https')
var config = require('../config.json')

module.exports = {
  parse: function (spotifyClient, discordClient, messageObject) {

    if (messageObject.content == discordClient.user.username + ", song?" || (messageObject.content == config.prefix + "song" && messageObject.author.id == discordClient.user.id)) {

      console.log('Requested songinfo')

      spotifyClient.getStatus(function(err, res) {
        if (err) {
          return console.error(err)
        }

        var song_url = res.track.track_resource.location.og

        var album_url = ""
        var https_opt = {
          host: 'open.spotify.com',
          path: '/oembed?url=' + res.track.track_resource.uri,
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000
        }

        var https_req = https.request(https_opt, (https_res) => {
          https_res.setEncoding('utf8')
          https_res.on('data', (data) => {
            
            var content = JSON.parse(data)

            // Send embed
            messageObject.channel.send({embed: {
              description: 'by **' + res.track.artist_resource.name + '** from the album ' + res.track.album_resource.name,
              title: res.track.track_resource.name,
              url: song_url,
              color: 8699136,
              footer: {
                icon_url: "https://image.flaticon.com/icons/png/512/174/174872.png",
                text: "on Spotify"
              },
              thumbnail: {
                url: content.thumbnail_url
              },
              author: {
                name: discordClient.user.username + " is listening to",
                url: song_url
              }
            }})

          })
        })

        https_req.end()

      })

    }

  }
}