const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'embed',
    description: 'Creates an embedded message',
    deleted: true,
    options: [
        {
            name: 'field-title',
            description: 'title of first field',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'field-description',
            description: 'description of first field',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'color',
            description: 'embed edge color',
            type: ApplicationCommandOptionType.String, // Could be a hex value, but too lazy
            choices: [
                {
                    name: 'Random',
                    value: 'Random',
                },
                {
                    name: 'Red',
                    value: 'Red',
                },
                {
                    name: 'Green',
                    value: 'Green',
                },
                {
                    name: 'Blue',
                    value: 'Blue',
                },
            ],
        },
    ],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        const fieldTitle = interaction.options.get('field-title').value;
        const fieldDescription = interaction.options.get('field-description').value;
        const color = interaction.options.get('color')?.value || 'Random';

        await interaction.deferReply();

        try {
            const embed = new EmbedBuilder()
            .setTitle('Embed Title')
            .setDescription('This is an extremely important embed')
            .setColor(color)
            .setFields(
                {
                name: fieldTitle,
                value: fieldDescription,
                inline: false,
                },
            );

            interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.log(`There was an error running embed: ${error}`)
        }
    },
}