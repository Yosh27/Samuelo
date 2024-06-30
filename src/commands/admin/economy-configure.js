const { ApplicationCommandOptionType, Client, Interaction, PermissionFlagsBits } = require("discord.js");
const Economies = require("../../schemas/Economies");

module.exports = {
    name: 'economy-configure',
    description: 'Configure economy commands for this server.',
    options: [
        {
            name: 'level-enable',
            description: 'Should levels be enabled in this server?',
            type: ApplicationCommandOptionType.Boolean,
            required: true,
            choices: [
                {
                    name: 'true',
                    value: true,
                },
                {
                    name: 'false',
                    value: false,
                },
            ]
        },
        {
            name: 'balance-enable',
            description: 'Should `/daily` and other balance-related commands be enabled in this server?',
            type: ApplicationCommandOptionType.Boolean,
            required: true,
            choices: [
                {
                    name: 'true',
                    value: true,
                },
                {
                    name: 'false',
                    value: false,
                },
            ]
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        if (!interaction.inGuild()) {
            interaction.reply('You can only run this command in a server.');
            return;
        }

        const newLevelEnable = interaction.options.get('level-enable').value;
        const newBalanceEnable = interaction.options.get('balance-enable').value;
        try {
            await interaction.deferReply();
            
            let economies = await Economies.findOne({ guildId: interaction.guild.id});
            if (economies) {
                if (economies.levelEnable === newLevelEnable && economies.balanceEnable === newBalanceEnable) {
                    interaction.editReply("The server economy has already been configured for this setting. To disable, run `/economy-disable` or, to change settings, use `/economy-configure` with different arguments.");
                    return;
                }

                economies.levelEnable = newLevelEnable;
                economies.balanceEnable = newBalanceEnable;
            } else {
                economies = new Economies({
                    guildId: interaction.guild.id,
                    levelEnable: newLevelEnable,
                    balanceEnable: newBalanceEnable,
                });
            }

            await economies.save();
            interaction.editReply("Economy settings have now been configured. To disable, run `/economy-disable`");

        } catch (error) {
            console.log(`There was an error with economy-configure: ${error}`);
        }
    },
};