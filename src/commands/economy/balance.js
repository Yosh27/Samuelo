const { ApplicationCommandOptionType, Client, Interaction } = require("discord.js");
const User = require('../../schemas/User');
const Economies = require('../../schemas/Economies');

module.exports = {
    name: 'balance',
    description: "See your/someone else's balance",
    options: [ 
        {
            name: 'user',
            description: 'The user whose balance you want to get',
            type: ApplicationCommandOptionType.User,
        }
    ],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        if (!interaction.inGuild()) {
            interaction.reply({ content: "You can only run this command in a server.", ephemeral: true });
            return;
        }

        const balanceEnabled = await Economies.findOne({ guildId: interaction.guild.id, balanceEnable: true });
        if (!balanceEnabled) {
            interaction.reply("This server does not support the `/balance` command.");
            return;
        }
        
        const targetUserId =  interaction.options.get('user')?.value || interaction.member.id;
        await interaction.deferReply();
        
        const user = await User.findOne({ userId: targetUserId, guildId: interaction.guild.id });
        if (!user) {
            interaction.editReply(`<@${targetUserId}> doesn't have a profile yet.`);
            return;
        }

        interaction.editReply(
            targetUserId === interaction.member.id 
            ? `Your balance is **${user.balance}**`
            : `<@${targetUserId}>'s balance is **${user.balance}**`
        );
    },
    
};