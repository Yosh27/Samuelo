const {Client, Interaction} = require('discord.js');
const User = require('../../schemas/User');
const Economies = require('../../schemas/Economies');

const dailyAmount = 1000;

module.exports = {
    name: 'daily',
    description: 'Collect your dailies!',
    
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        if (!interaction.inGuild()) {
            interaction.reply({ content: 'You can only run this command in a server.', ephemeral: true});
            return;
        }

        const balanceEnabled = await Economies.findOne({ guildId: interaction.guild.id, balanceEnable: true });
        if (!balanceEnabled) {
            interaction.reply("This server does not support the `/daily` command.");
            return;
        }

        try {
            await interaction.deferReply();

            let query = {
                userId: interaction.member.id,
                guildId: interaction.guild.id,
            };

            let user = await User.findOne(query);
            if (user) {
                const lastDailyDate = user.lastDaily.toDateString();
                const currDate = new Date().toDateString();

                if (lastDailyDate === currDate) {
                    interaction.editReply("You have already collected your dailies today. Come back tomorrow");
                    return;
                }

                user.lastDaily = new Date();
            } else {
                user = new User( {
                    ...query,
                    lastDaily: new Date(),
                });
            }

            user.balance += dailyAmount;
            await user.save();

            interaction.editReply(`${dailyAmount} was added to your balance. Your new balance is ${user.balance}`);
        } catch (error) {
            console.log(`Error with daily: ${error}`);
        }
    },
};