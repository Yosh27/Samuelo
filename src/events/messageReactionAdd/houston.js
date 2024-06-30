const { Client, MessageReaction } = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {MessageReaction} reaction 
 * @returns 
 */
module.exports = (client, reaction) => {
    try {
        if (!reaction.message.inGuild() || reaction.message.content !== 'Houston, do you copy?') return;
    
        if (reaction.emoji.name === '✅') {
            reaction.message.reply("Thank goodness");
        }

    } catch (error) {
        console.log(`Houston has an error: ${error}`);
    }
};