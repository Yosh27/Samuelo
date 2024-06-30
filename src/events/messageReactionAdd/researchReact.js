const { Client, MessageReaction } = require("discord.js");
const accessGoogleSheet = require('../../utils/accessGoogleSheet');
const TechLevel = require('../../schemas/TechLevel');
const {GoogleSpreadsheet} = require('google-spreadsheet');
require('dotenv').config();

/**
 * 
 * @param {Client} client 
 * @param {MessageReaction} reaction 
 * @returns 
 */
module.exports = async (client, reaction) => {
    const message = reaction.message;
    try {
        if (!message.inGuild() || message.embeds.length <= 0) return;

        if (reaction.emoji.name === '🟥') {
            message.embeds.forEach(async (embed) => {
                const descriptionComponents = embed.description.split(' ');
                const nickname = descriptionComponents[0];
                let tech = descriptionComponents[2];
                if (descriptionComponents.length > 3) {
                    for (i = 3; i < descriptionComponents.length; i++) {
                        tech = tech.concat(' ').concat(descriptionComponents[i]);
                    }
                }
                
                const fieldComponents = embed.fields[0].value.split(' ');
                const pID = parseInt(fieldComponents[1]);
                const rType = fieldComponents[2].slice(2,6);
                

                // Update Database
                try {
                    const techLevel = await TechLevel.findOne({pID: pID, rType: rType});
                    techLevel.potentialLevel -= 1;
                    await techLevel.save();

                    if (techLevel.currLevel == techLevel.potentialLevel) {
                        await TechLevel.findOneAndDelete({pID: pID, rType: rType});
                    }
                } catch (error) {
                    console.log(`Couldn't deny action: ${error}`);
                }
                
                // Message
                // message.reply(`${nickname}, your tech \`${tech}\` has been rejected. Check <#${process.env.CHANNEL_ID}> to see if the mods have given a reason.`);
                console.log(`Action for player with PID ${pID} has been rejected`);
            });
            return;
        }

        if (reaction.emoji.name === '✅') {
             message.embeds.forEach(async (embed) => {
                const descriptionComponents = embed.description.split(' ');
                const nickname = descriptionComponents[0];
                let tech = descriptionComponents[2];
                if (descriptionComponents.length > 3) {
                    for (i = 3; i < descriptionComponents.length; i++) {
                        tech = tech.concat(' ').concat(descriptionComponents[i]);
                    }
                }
                
                const fieldComponents = embed.fields[0].value.split(' ');
                const pID = parseInt(fieldComponents[1]);
                const rType = fieldComponents[2].slice(2,6);

                try {
                    // Update First Sheet
                    const doc = await accessGoogleSheet(process.env.TARAGAN_SPREADSHEET_ID);
                    await doc.loadInfo();
                    const sheet = doc.sheetsByIndex[0];
                    await sheet.loadCells(`D${pID + 1}:K${pID + 1}`);
                    
                    let col;
                    switch (rType) {
                        case 'RCUL':
                            col = 'D';
                            break;
                        case 'RECO':
                            col = 'E';
                            break;
                        case 'REDU':
                            col = 'F';
                            break;
                        case 'RHUS':
                            col = 'G';
                            break;
                        case 'RGOV':
                            col = 'H';
                            break;
                        case 'RINF':
                            col = 'I';
                            break;
                        case 'RITR':
                            col = 'J';
                            break;
                        case 'RLOG':
                            col = 'K';
                            break;
                    }
                    const cell = sheet.getCellByA1(`${col}${pID + 1}`);
                    const techNum = parseInt(cell.value) + 1;

                    cell.value = techNum;
                    cell.note = `${cell.note}, ${tech}`;
                    await sheet.saveUpdatedCells();

                    
                    // Update Second Sheet
                    const doc2 = await accessGoogleSheet(process.env.TARAGAN_SPREADSHEET_COPY_ID);
                    await doc2.loadInfo();
                    const sheet2 = doc2.sheetsByIndex[1];

                    const rowIndex = ( !(pID === 5 && techNum > 30)
                        ? 31*(pID - 1) + techNum + 1
                        : 31*40 + techNum - 29);

                    col = String.fromCharCode(col.charCodeAt() - 1);

                    await sheet2.loadCells(`${col}${rowIndex}:${col}${rowIndex}`);
                    const cell2 = sheet2.getCellByA1(`${col}${rowIndex}`);

                    cell2.value = tech;
                    await sheet2.saveUpdatedCells();


                    // Update Database
                    const techLevel = await TechLevel.findOne({pID: pID, rType: rType});
                    techLevel.currLevel += 1;
                    await techLevel.save();

                    if (techLevel.currLevel == techLevel.potentialLevel) {
                        await TechLevel.findOneAndDelete({pID: pID, rType: rType});
                    }

                    // Message
                    // message.reply(`${nickname}, your tech \`${tech}\` has been accepted`);
                    console.log(`Action for player with PID ${pID} has been accepted`);
                } catch (error) {
                    console.log(`There was an error trying to update the spreadsheet: ${error}`);
                }
            });
            return;
        }

        

    } catch (error) {
        console.log(`researchReact has an error: ${error}`);
    }
}