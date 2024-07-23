const {Client, Message} = require('discord.js');
require('dotenv');
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @returns 
 */

module.exports = (client, message) => {    
    if (message.content === 'Long live the Corvids! Long live Taragan!' && message.member.roles.cache.has(process.env.GOD_ROLE_ID)) {
        message.reply('Long live the Corvids!! Long live Taragan!!');
        return;
    }
};