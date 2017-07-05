// userinfo.js
// Returns user information for the given user
// Created by digital#0781

var config = require('../config')
const dateformat = require('dateformat')

module.exports = {
  parse: function (spotifyClient, discordClient, messageObject) {
    if ((messageObject.content.substring(0, 9) === config.prefix + 'userinfo' || messageObject.content.substring(0, 6) === config.prefix + 'uinfo') && messageObject.author.id === discordClient.user.id) {
      var user = messageObject.mentions.users.first()
      messageObject.channel.send({embed: {
        color: 3447003,
        thumbnail: {
          url: 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar + '.gif'
        },
        author: {
          name: 'Userinfo for ' + user.username + '#' + user.discriminator
        },
        fields: [
          {
            name: 'Created',
            value: dateformat(user.createdAt)
          },
          {
            name: 'Presence',
            value: 'Status: ' + user.presence.status
          },
          {
            name: 'User Notes',
            value: ((user.note === null || user.note === '') ? 'None' : user.note)
          }
        ],
        footer: {
          text: 'User ID: ' + user.id,
          timestamp: new Date()
        }
      }})
    }
  }
}
