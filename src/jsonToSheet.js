const { globSync } = require('glob');
const XLSX = require('xlsx');

const newbook = XLSX.utils.book_new();

const filesEN = globSync('./public/locales/en/**/*.*');
const filesVi = globSync('./public/locales/vi/**/*.*');

for (let index = 0; index < filesEN.length; index++) {
  const aoa = [['key', 'en', 'vi']];

  const name = filesEN[index]?.split('/')[filesEN[index]?.split('/').length - 1]?.split('.')[0];

  const contentEn = require(`../${filesEN[index]}`);
  const contentVi = require(`../${filesVi[index]}`);

  Object.keys(contentEn).map((e, index) => {
    aoa.push([
      e,
      contentEn[e],
      contentVi[e] ? contentVi[e] : { t: 'n', f: `GOOGLETRANSLATE(B${index + 2};"en";"vi")` },
    ]);
  });

  const ws = XLSX.utils.aoa_to_sheet(aoa);

  XLSX.utils.book_append_sheet(newbook, ws, name);
}

XLSX.writeFile(newbook, './scripts/typhoon-locale.xlsx', {});
