require('dotenv');

module.exports = {
    name: 'pingsh',
    description: "Pings all the secondary hornies. Don't let your mother find out",
    deleted: true,
    callback: (client, interaction) => {
        interaction.reply(`<@&${process.env.SEC_HORN_ROLE_ID}>`);
        return;
    },
};