require('dotenv');

module.exports = {
    name: 'atsechorn',
    description: "Pings all the secondary hornies. Don't let your mother find out",
    callback: (client, interaction) => {
        interaction.reply(`<@&${process.env.SEC_HORN_ROLE_ID}>`);
        return;
    },
};