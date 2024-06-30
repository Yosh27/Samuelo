const {GoogleSpreadsheet} = require('google-spreadsheet');
const {JWT} = require('google-auth-library');
const creds = require('../../taragan-research.json');



module.exports = async (sheetID) => {

    const serviceAccountAuth = new JWT({
        email: creds.client_email,
        key: creds.private_key,
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
        ],
      });


    const doc = new GoogleSpreadsheet(sheetID, serviceAccountAuth);
    return doc;
};
