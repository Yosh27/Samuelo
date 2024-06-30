const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const accessGoogleSheet = require("../../utils/accessGoogleSheet");
const TechLevel = require('../../schemas/TechLevel');
require('dotenv');

module.exports = {
    name: 'research',
    description: 'Performs a research action',
    options: [
        {
            name: 'pid',
            description: 'Your player ID next to your name',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: 'research-type',
            description: 'Category that the tech falls into',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'RCUL',
                    value: 'RCUL',
                },
                {
                    name: 'RECO',
                    value: 'RECO',
                },
                {
                    name: 'REDU',
                    value: 'REDU',
                },
                {
                    name: 'RHUS',
                    value: 'RHUS',
                },
                {
                    name: 'RGOV',
                    value: 'RGOV',
                },
                {
                    name: 'RINF',
                    value: 'RINF',
                },
                {
                    name: 'RITR',
                    value: 'RITR',
                },
                {
                    name: 'RLOG',
                    value: 'RLOG',
                },
            ],
        },
        {
            name: 'name',
            description: 'Name of the tech you are researching',
            type: ApplicationCommandOptionType.String,
        },
    ],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        if(interaction.channel.id !== process.env.ACTION_CHANNEL_ID && interaction.channel.id !== process.env.BOT_TESTING_CHANNEL_ID) {
            interaction.reply({content: `You can only use this action in <#${process.env.ACTION_CHANNEL_ID}>.`, ephemeral: true});
            return;
        }

        // if(!interaction.member.roles.cache.has(process.env.GOD_ROLE_ID)) {
        //     interaction.reply({content: "You do not currently have access to this command.", ephemeral: true});
        //     return;
        // }

        // Info from Command
        const user = await interaction.guild.members.fetch(interaction.user.id);
        const tech = interaction.options.get('name')?.value || 'General Tech';
        const rType = interaction.options.get('research-type').value;
        const pID = interaction.options.get('pid').value;
        
        // Info from Google Sheet
        const doc = await accessGoogleSheet(process.env.TARAGAN_SPREADSHEET_ID);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        const currTechNum = parseInt(rows[pID - 1].get(rType));

        // Info to/from Database
        let techLevel = await TechLevel.findOne({pID: pID, rType: rType});
        if (techLevel) {
            techLevel.potentialLevel += 1;
        } else {
            techLevel = new TechLevel({
                pID: pID,
                rType: rType,
                currLevel: currTechNum,
                potentialLevel: (currTechNum + 1),
            });
        }
        await techLevel.save();
        
        // Creating the Embed
        const fieldDescription = `PID: ${pID} \n\`${rType}\` → ${techLevel.currLevel} + ${techLevel.potentialLevel - techLevel.currLevel} = ${techLevel.potentialLevel}`;

        await interaction.deferReply();

        try {
            const embed = new EmbedBuilder()
            .setTitle('Research Action')
            .setDescription(`${user} **researches** ${tech}`)
            .setColor('Aqua')
            .setFields(
                {
                name: 'Info:',
                value: fieldDescription,
                inline: false,
                },
            );

            interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.log(`There was an error running research: ${error}`)
        }
    },
};