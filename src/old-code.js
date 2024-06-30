





//     try {
//         if (interaction.isButton()) {
//             await interaction.deferReply({ephemeral: true});
//             console.log(interaction);
//             const role = interaction.guild.roles.cache.get(interaction.customId);
//             if (!role) {
//                 interaction.editReply({
//                     content: "I couldn't find that role",
//                 });
//                 return;
//             }
    
//             const hasRole = interaction.member.roles.cache.has(role.id);
//             if (hasRole) {
//                 await interaction.member.roles.remove(role);
//                 await interaction.editReply(`The role ${role} has been removed.`);
//                 return;
//             }
    
//             await interaction.member.roles.add(role);
//             await interaction.editReply(`The role ${role} has been added.`);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// });



// require('dotenv').config();
// const {Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

// const client = new Client({
//     intents: [
//         IntentsBitField.Flags.Guilds,
//         IntentsBitField.Flags.GuildMembers,
//         IntentsBitField.Flags.GuildMessages,
//         IntentsBitField.Flags.MessageContent,   
//     ]
// });

// const roles = [
//     {
//         id: '1186099410388664360',
//         label: 'Certified Mallet User',
//     },
//     {
//         id: '1186099611258081352',
//         label: 'Tester',
//     },
//     {
//         id: '1186099707085340782',
//         label: 'Observer',
//     },
// ]

// client.on('ready', async (c) => {
//     try {
//         const channel = await client.channels.cache.get('1178088777038712985');
//         if (!channel) return;

//         const row = new ActionRowBuilder();

//         roles.forEach((role) => {
//             row.components.push(
//                 new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
//             );
//         });

//         await channel.send( {
//             content: 'Claim or remove a row below',
//             components: [row],
//         });

//         process.exit();
//     } catch (error) {
//         console.log(error);
//     }
// });