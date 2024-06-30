const { ApplicationCommandOptionType, Client, Interaction, AttachmentBuilder } = require("discord.js");
const canvacord = require('canvacord');
const calculateLevelXP = require('../../utils/calculateLevelXP');
const Level = require('../../schemas/Level');
const Economies = require("../../schemas/Economies");

module.exports = {
    name: 'level',
    description: "Shows your/someone's level",
    options: [
        {
            name: 'target-user',
            description: 'The user whose level you want to see.',
            type: ApplicationCommandOptionType.Mentionable,
        },
    ],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        if (!interaction.inGuild()) {
            interaction.reply("You can only run this command in a server.");
            return;    
        }

        const levelEnabled = await Economies.findOne({ guildId: interaction.guild.id, levelEnable: true });
        if (!levelEnabled) {
            interaction.reply("This server does not support the `/level` command.");
            return;
        }

        await interaction.deferReply();

        const mentionedUserId = interaction.options.get('target-user')?.value;
        const targetUserId = mentionedUserId || interaction.member.id;
        const targetUserObject = await interaction.guild.members.fetch(targetUserId);
        const fetchedLevel = await Level.findOne({
            userId: targetUserId,
            guildId: interaction.guild.id,
        })

        if (!fetchedLevel) {
            interaction.editReply(
                mentionedUserId 
                ? `${targetUserObject.user.tag} doesn't have any levels yet. Try again when they chat a little more.` 
                : `You don't have any levels yet. Chat a little more and try again.`
            );
        }

        let allLevels = await Level.find({guildId: interaction.guild.id}).select('-_id userId level xp');

        allLevels.sort((a,b) => {
            if (a.level === b.level) {
                return b.xp - a.xp;
            } else {
                return b.level - a.level;
            }
        });

        let currentRank = allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1;

        const rank = new canvacord.Rank()
            .setAvatar(targetUserObject.user.displayAvatarURL({size: 256}))
            .setRank(currentRank)
            .setLevel(fetchedLevel.level)
            .setCurrentXP(fetchedLevel.xp)
            .setRequiredXP(calculateLevelXP(fetchedLevel.level))
            .setStatus(targetUserObject.presence.status)
            .setProgressBar('#1D8292', 'COLOR')
            .setUsername(targetUserObject.user.username)
            .setDiscriminator(targetUserObject.user.discriminator);

        const data = await rank.build();
        const attachment = new AttachmentBuilder(data);
        interaction.editReply({files: [attachment]});
    },
};