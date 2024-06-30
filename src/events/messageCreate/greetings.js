const {Client, Message} = require('discord.js');
require('dotenv');
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @returns 
 */

module.exports = (client, message) => {    
    if (message.content === 'Long live the Regime!' && message.member.roles.cache.has(process.env.GOD_ROLE_ID)) {
        message.reply('Long live the regime!');
        return;
    }
    
    if (message.author.bot) return;
    
    
    if (message.content.toLowerCase().includes('sam') && message.content.toLowerCase().includes('hello')) {
        message.reply('Hello!');
        return;
    }

    if (message.content.toLowerCase().includes('sam') && message.content.toLowerCase().includes('bye')) {
        message.reply((Math.random() > 0.5) ? 'Goodbye!' : 'Bye!');
        return;
    }

    if (message.content.toLowerCase().includes('sam') && (message.content.toLowerCase().includes('gn') || message.content.toLowerCase().includes('good night'))) {
        message.reply((Math.random() > 0.5) ? 'Good night!' : 'Sleep well!');
        return;
    }

    if (message.content.toLowerCase().includes('sam') && message.content.toLowerCase().includes('thank') || message.content.toLowerCase().includes('thamk')) {
        const num = Math.random();
        message.reply((num > 0.33) ? ((num > 0.66) ? "You're welcome" : 'Anytime!' ) : 'No problem!');
        return;
    }

    if (message.content.toLowerCase().includes('sam') && message.content.toLowerCase().includes('how are you')) {
        message.reply("I'm doing great\nWhat about you?");
        return;
    }

    if (message.content.toLowerCase().includes('sam') && message.content.toLowerCase().includes("what's up") || message.content.toLowerCase().includes("whats up")) {
        message.reply("Nothing much\nWhat about you?");
        return;
    }

    if (message.content.toLowerCase().includes('sam') && message.content.toLowerCase().includes("i love you")) {
        message.react('❤');
        return;
    }

    if (message.content.toLowerCase().includes('sam') && message.content.toLowerCase().includes("like") && message.content.toLowerCase().includes("putin")) {
        message.reply("Ew! No way!");
        return;
    }

    if (message.content.toLowerCase().includes('sam') && message.content.toLowerCase().includes("bonjour")) {
        message.reply("Bonjour!\n||Je vois que tu as choisi la meilleure langue. Je suis espagnol, mais je sais qu'il est vrai||");
        return;
    }

    if (message.content.toLowerCase().includes('sam') && message.content.toLowerCase().includes("?")) {
        message.reply("AAAAAHHH! TOO MANY QUESTIONS");
        return;
    }

    if (message.content.toLowerCase().includes('sam') && message.content.toLowerCase().includes("do it with")) {
        message.reply(`I choose you, <@${message.author.id}>!`);
        return;
    }

	if (message.content.toLowerCase().includes('sam') && message.content.toLowerCase().includes("porn")) {
        message.reply("I'm warning you...");
        return;
    }
    if (message.content.toLowerCase().includes('sam') && message.content.toLowerCase().includes("welcome back")) {
        message.reply("I'm just glad to be here");
        message.react('❤');
        return;
    }
};
