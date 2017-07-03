// eval.js
// Runs debug commands from the bot inside Discord
// Created by digital#0781

var config = require('../config.json')

module.exports = {
  parse: function (spotifyClient, discordClient, messageObject) {

    if (messageObject.content.substring(0, 5) == config.prefix + 'eval' && messageObject.author.id == discordClient.user.id) {
      console.log('Running eval >> ' + messageObject.content.substring(6))
      messageObject.delete()
      messageObject.channel.send("```" + eval(messageObject.content.substring(6)) + "```")
    }

  }
}