const { Schema, model } = require('mongoose');

const techLevel =  new Schema({
    pID: {
        type: Number,
        required: true,
    },
    rType: {
        type: String,
        required: true,
    },
    currLevel: {
        type: Number,
        default: 0,
    },
    potentialLevel: {
        type: Number,
        default: 0,
    },
})

module.exports = model('TechLevel', techLevel);