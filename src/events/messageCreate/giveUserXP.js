const {Client, Message} = require('discord.js');
const Level = require('../../schemas/Level'); 
const calculateLevelXP = require('../../utils/calculateLevelXP');
const cooldowns = new Set();
const Economies = require('../../schemas/Economies');

function getRandomXP(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    const levelEnabled = await Economies.findOne({ guildId: message.guild.id, levelEnable: true });
    if (!message.inGuild() || message.author.bot || cooldowns.has(message.author.id) || !levelEnabled) return;

    const xpToGive = getRandomXP(5, 15);

    const query = {
        userId: message.author.id,
        guildId: message.guild.id,
    };

    try {
        const level = await Level.findOne(query);

        if (level) {
            level.xp += xpToGive;

            if (level.xp > calculateLevelXP(level.level)) {
                level.xp = 0;
                level.level += 1;

                message.channel.send(`${message.member}, you have leveled up to **Level ${level.level}**!`);
            }

            await level.save().catch((e) => {
                console.log(`Error saving updated level: ${e}`);
                return;
            });
            
            cooldowns.add(message.author.id);
            setTimeout(() => {
                cooldowns.delete(message.author.id);
            }, 60000);
        }

        // if (!level)
        else {
            // create new level
            const newLevel = new Level({
                userId: message.author.id,
                guildId: message.guild.id,
                xp: xpToGive,
            });

            await newLevel.save();

            cooldowns.add(message.author.id);
            setTimeout(() => {
                cooldowns.delete(message.author.id);
            }, 60000);
        }
    } catch (error) {
        console.log(`There was an error giving xp: ${error}`);
    }

};