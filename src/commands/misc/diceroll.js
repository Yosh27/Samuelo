const { Client, Interaction, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: 'diceroll',
    description: 'Rolls a die',
    options: [
        {
            name: 'dice-sidedness',
            description: 'Number of sides you want the die to have. Must be a whole number from 2 to 100, and default is 6',
            type: ApplicationCommandOptionType.Integer,
        },
    ],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     * @returns 
     */

    callback: async (client, interaction) => {
        const diceSidedness = interaction.options.get('dice-sidedness')?.value || 6;

        await interaction.deferReply();

        if (isNaN(diceSidedness) || diceSidedness < 1 || diceSidedness > 100) {
            await interaction.editReply("The dice sidedness must be a number between 2 and 100.");
            return;
        }

        result = Math.floor(Math.random() * diceSidedness);

        try {
            await interaction.editReply(`You rolled a ${result}!`);
        } catch (error) {
            console.log(`There was an error while adding: ${error}`);
        }
    },
}