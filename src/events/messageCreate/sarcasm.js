const {Client, Message} = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @returns 
 */

module.exports = (client, message) => {
    if (message.author.bot) return;
    
    if (message.content === 'Was it really that hard?') {
        message.reply('Yes');
    } 
    else if (message.content.toLowerCase().includes('fuck you')) {
        message.reply('Fuck you');
    } 
    else if (message.content === "I'm taking a break") {
        message.reply("Noooo, don't leave meee!")
    }
    // else if (message.author.id === '983738489046695976' && message.content.toLowerCase().includes('sam')) {
    //     message.reply(`I don't want to talk to you <@983738489046695976>`);
    // }
};