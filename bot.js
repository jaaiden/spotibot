// Autoupdater
// const autoupdater = require('auto-updater')
// var updater = new autoupdater({
//   autoupdate: false,
//   checkgit: false,
// })

// updater.on('check.up-to-date', v => { console.log('You have the latest version of spotibot', v) })
// updater.on('check.out-dated', (vOld, v) => {
//   console.warn('Your version of spotibot is out of date.', '(' + vOld + ' => ' + v + ')')
//   console.warn('Downloading new version...')
//   updater.fire('download-update')
// })
// updater.on('update.downloaded', () => {
//   console.log('Update downloaded! Extracting...')
//   updater.fire('extract')
// })
// updater.on('update.extracted', () => {
//   console.log('Update complete! Please restart the app to use the new version!')
// })
// updater.on('download.start', name => {
//   console.info('Started:', name)
// })
// updater.on('download.progress', (name, percent) => {
//   process.stdout.write('[v] ' + percent + '% \033[0G')
// })
// updater.on('download.end', name => {
//   console.log('Finished downloading update!')
// })
// updater.on('download.error', err => {
//   console.error('Error downloading update:', err)
// })
// updater.on('end', () => {
//   console.log('Autoupdate: Done!')
// })
// updater.on('error', (name, err) => {
//   console.error(name, err)
// })

// console.log('Autoupdate: Checking for new version of spotibot...')
// updater.fire('check')

// Start of bot code
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

var enabledExtensions = {}

function initExtensions() {
  fs.readdirSync(extdir).forEach(file => {
    enabledExtensions[file] = require(extdir + file)
  })

  console.log('>> Enabled extensions:')
  for (ext in enabledExtensions) {
    console.log('>>\t', ext)
  }
}

client.on('ready', () => {
  console.info(`Connected user ${client.user.username}`)

  spotify.getStatus( (err, res) => {
    if (err) return console.error(err)

    if (res.track.track_resource.name === undefined) currentSong = 'nothing'
    else currentSong = res.track.track_resource.name + ' by ' + res.track.artist_resource.name
    
    console.info('Now playing', currentSong)
    client.user.setGame(currentSong)
  })


  setInterval( (err, res) => {
    spotify.getStatus( (err, res) => {
      if (err) return console.error(err)

      if (res.track.track_resource.name === undefined) newSong = 'nothing'
      else newSong = res.track.track_resource.name + ' by ' + res.track.artist_resource.name

      if (newSong != currentSong) {
        client.user.setGame(newSong)
        console.info('Now playing', newSong)
        currentSong = newSong
      }
    })
  }, 10000)


})

client.on('message', message => {
  // Have extensions parse the messages
  for (enabledExt in enabledExtensions) {
    enabledExtensions[enabledExt].parse(spotify, client, message)
  }
})

initExtensions()
client.login(config.token)