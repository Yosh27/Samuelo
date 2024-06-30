const {Schema, model} = require('mongoose');

const economiesSchema = new Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    levelEnable: {
        type: Boolean,
        required: true,
        default: false,
    },
    balanceEnable: {
        type: Boolean,
        required: true,
        default: false,
    },
});

module.exports = model('Economies', economiesSchema);