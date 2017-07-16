// lyrics.js
// Gets the lyrucs for the current song and returns an embed to the channel
// Created by digital#0781

const lyrics = require('lyric-get')
const https = require('https')
var config = require('../config.json')

module.exports = {
  parse: function (spotifyClient, discordClient, messageObject) {

    if (messageObject.content == config.prefix + "lyrics" && messageObject.author.id == discordClient.user.id) {

      console.log('Requested lyrics')

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

            var lyricdata = lyrics.get(res.track.artist_resource.name, res.track.track_resource.name, (lyric_err, lyric_res) => {
              if (lyric_err) console.error("Error retreiving lyric data!")
              else {

                // Send embed
                messageObject.channel.send({embed: {
                  description: lyric_res,
                  url: song_url,
                  color: 3447003,
                  footer: { text: "from LyricWikia" },
                  thumbnail: { url: content.thumbnail_url },
                  author: { name: 'Lyrics for ' + res.track.track_resource.name, url: song_url }
                }})

              }
            })

          })
        })

        https_req.end()

      })

    }

  }
}