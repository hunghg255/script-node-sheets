import fs from 'fs';

const login = async () => {
    const sheetID = 'SHEET ID';
    const key = 'GOOGLE SHEET API KEY';
    const range = 'Sheet1!A2:C35'; // values range
    const data = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${key}`
    );
    const response = await data.json();
    console.log('response', response);
    const vi = [];
    const en = [];
    for (let i = 0; response.values.length > i; i++) {
        const key = response.values[i][0];
        const enTrans = response.values[i][1];
        const viTrans = response.values[i][2];
        vi.push(`${key}: "${viTrans}"`);
        en.push(`${key}: "${enTrans}"`);
    }
    return { vi, en };
};

const data = await login();

fs.writeFile(
    './src/utils/locale.ts',
    `
  export const vi = {
    ${data.vi.join(',')}
  };
  export const en = {
    ${data.en.join(',')}
  };
`,
    () => {}
);
