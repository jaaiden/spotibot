const https = require('https')

const Discord = require("discord.js")
const client = new Discord.Client()

var nodeSpotifyWebHelper = require('node-spotify-webhelper')
var spotify = new nodeSpotifyWebHelper.SpotifyWebHelper()

var config = require('./config.json')
var currentSong, newSong

const extdir = './extensions/'
const fs = require('fs')

console.log('Starting spotibot...')
console.log('Press ctrl+c to quit.')

spotify.getStatus( (err, res) => {
  if (err) return console.error(err)

  console.info(`Connected user ${client.user.username}`)
  console.info('Now playing', res.track.track_resource.name, 'by', res.track.artist_resource.name)

  currentSong = res.track.track_resource.name + ' by ' + res.track.artist_resource.name
  client.user.setGame(currentSong)
})

setInterval( (err, res) => {
  spotify.getStatus( (err, res) => {
    if (err) return console.error(err)

    newSong = res.track.track_resource.name + ' by ' + res.track.artist_resource.name
    if (newSong != currentSong) {
      client.user.setGame(newSong)
      console.info('Now playing', res.track.track_resource.name, 'by', res.track.artist_resource.name)
      currentSong = newSong
    }
  })
}, 10000)

client.on('message', message => {
  // Have extensions parse the messages
  fs.readdirSync(extdir).forEach(file => {
    for (enabledext in config.enabled_extensions) {
      if (file.split('.')[0] == config.enabled_extensions[enabledext]) {
        var filereq = require(extdir + file)
        filereq.parse(spotify, client, message)
      }
    }
  })
  
})

client.login(config.token)