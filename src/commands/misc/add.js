const { Client, Interaction, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: 'add',
    description: 'Adds two numbers',
    options: [
        {
            name: 'first-number',
            description: 'First number to add',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: 'second-number',
            description: 'Second number to add',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
    ],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     * @returns 
     */

    callback: async (client, interaction) => {
        const firstNum = interaction.options.get('first-number').value;
        const secondNum = interaction.options.get('second-number').value;

        await interaction.deferReply();

        if (isNaN(firstNum)) {
            await interaction.editReply("The first value is not a number.");
            return;
        }
        
        if (isNaN(secondNum)) {
            await interaction.editReply("The second value is not a number.");
            return;
        }

        try {
            await interaction.editReply(`The sum is ${firstNum + secondNum}`);
        } catch (error) {
            console.log(`There was an error while adding: ${error}`);
        }
    },
}