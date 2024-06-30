const {GoogleSpreadsheet} = require('google-spreadsheet');
const {JWT} = require('google-auth-library');
const creds = require('./taragan-research.json');

const serviceAccountAuth = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });

function printStudent(student) {
    console.log(`Name: ${student.get('Student Name')}`);
    console.log(`Major: ${student.get('Major')}`);
    console.log(`Home State: ${student.get('Home State')}`);
    console.log('--------------');
}

(async () => {
    const doc = new GoogleSpreadsheet('1PDZkJNJjSUv4TsPzE69PJqXXr2__E1ipMyRmTuGlZuU', serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    
    await sheet.loadCells({
        startRowIndex: 0,
        endRowIndex:  3,
        startColumnIndex: 0,
        endColumnIndex: 2,
    });

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 2; j++) {
            console.log(`${i}, ${j}: ${sheet.getCell(i, j).value}`);
        }
    }

    const a2 = sheet.getCell(1, 0);
    a2.value = 'Alexis';
    a2.save();
})();
