const { ApplicationCommandOptionType, Client, Interaction, PermissionFlagsBits } = require("discord.js");
const Economies = require("../../schemas/Economies");

module.exports = {
    name: 'economy-disable',
    description: 'Disable economy settings for this server.',
    permissionsRequired: [PermissionFlagsBits.Administrator],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        try {
            await interaction.deferReply();
            
            if (!(await Economies.exists({ guildId: interaction.guild.id}))) {
                interaction.editReply("Economy settings have not been configured for this server. Use `/economy-configure` to set it up.");
                return;
            }

            await Economies.findOneAndDelete({guildId: interaction.guild.id})
            interaction.editReply("Economy settings have been disabled for this server. Use `/economy-configure` to set it up again.");
             
        } catch (error) {
            console.log(`There was an error with economy-disable: ${error}`);
        }
    },
};