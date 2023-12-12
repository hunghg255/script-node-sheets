const { JWT } = require("google-auth-library");
const { GoogleSpreadsheet } = require("google-spreadsheet");

// const SHEET_URL = https://docs.google.com/spreadsheets/d/1wBvO8tkHjC3ReisnMG4gEmuKTXYHewqR4xsssxVu2sRrxcY/edit#gid=1885sss454s838
const SHEET_URL = '';
const SERVICE_ACCOUNT_CONFIG = {
  // config from json file
}

const SHEET_ARRAY = SHEET_URL.split('/');

const SPREADSHEET_ID = SHEET_ARRAY[5];
const SHEET_ID = SHEET_ARRAY[SHEET_ARRAY.length - 1].split('=')[1];

const serviceAccountAuth = new JWT({
  email: SERVICE_ACCOUNT_CONFIG.client_email,
  key: SERVICE_ACCOUNT_CONFIG.private_key.replace(/\\n/g, "\n"),
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file',
  ],
});

const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

const saveDataToSheet = async () => {
  await doc.loadInfo();

  const sheet = doc.sheetsById[SHEET_ID];

  const result = await sheet.addRow({
    "Key": 'home',
    "EN": 'Home',
    "VI": 'Trang Chủ',
  });
  console.log(result);
}

saveDataToSheet();
