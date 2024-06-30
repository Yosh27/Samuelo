require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions,
    ]
});

(async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to db");
        eventHandler(client);

        client.login(process.env.TOKEN);
    } catch (error) {
        console.log(`There was an error connecting to the database: ${error}`);
    }
})();