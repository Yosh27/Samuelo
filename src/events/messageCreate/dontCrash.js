const { Client, Message } = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @returns 
 */
module.exports = (client, message) => {
    try {
        if (!message.inGuild() || !message.content.toLowerCase().includes('no crashing until i wake up')) return;
    
        message.react('✅');

    } catch (error) {
        console.log(`goodBot has an error: ${error}`);
    }
};