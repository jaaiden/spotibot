// embed.js
// Embeds a message into the Discord chat
// Created by digital#0781

var config = require('../config.json')

module.exports = {
  parse: function (spotifyClient, discordClient, messageObject) {

    if (messageObject.content.startsWith(config.prefix + 'embed') && messageObject.author.id == discordClient.user.id) {
      console.log('Running embed >> ' + messageObject.content.substring(7))
      messageObject.delete()
      messageObject.channel.send({embed:{
        description: messageObject.content.substring(7),
        color: 3447003,
        footer: {
          text: 'Sent from spotibot | Created by @digital#0781'
        }
      }})
    }

  }
}