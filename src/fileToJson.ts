import fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';

const pathFile = path.join(cwd(), 'scripts/Translation.xlsx');

const locales = ['en', 'es', 'ru', 'vi', 'zh'];

const start = async () => {
  // Dynamically import the xlsx library
  const XLSX = (await import('xlsx')).default;

  const workbook = XLSX.readFile(pathFile);

  const ns = workbook.SheetNames;

  for (const namespace of ns) {
    const worksheet = workbook.Sheets[namespace];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const enArr = [] as any;
    const viArr = [] as any;
    const ruArr = [] as any;
    const zhArr = [] as any;
    const esArr = [] as any;

    for (const jsonDatum of jsonData) {
      const { key, en, vi, ru, zh, es } = jsonDatum as any;
      enArr.push(`"${`${key}`.trim()}": "${`${en}`.trim()}"`);
      viArr.push(`"${`${key}`.trim()}": "${`${vi}`.trim()}"`);
      ruArr.push(`"${`${key}`.trim()}": "${`${ru}`.trim()}"`);
      zhArr.push(`"${`${key}`.trim()}": "${`${zh}`.trim()}"`);
      esArr.push(`"${`${key}`.trim()}": "${`${es}`.trim()}"`);
    }

    for (const locale of locales) {
      if (
        fs.existsSync(path.join(cwd(), `public/locales/${locale}`, `${namespace}.json`)) === false
      ) {
        fs.writeFileSync(path.join(cwd(), `public/locales/${locale}`, `${namespace}.json`), '{}');
      }

      let strLocale = '';
      if (locale === 'en') {
        strLocale = enArr.join(',\n');
      }
      if (locale === 'vi') {
        strLocale = viArr.join(',\n');
      }
      if (locale === 'ru') {
        strLocale = ruArr.join(',\n');
      }
      if (locale === 'zh') {
        strLocale = zhArr.join(',\n');
      }
      if (locale === 'es') {
        strLocale = esArr.join(',\n');
      }

      fs.writeFileSync(
        path.join(cwd(), `public/locales/${locale}`, `${namespace}.json`),
        `
{
  ${strLocale}
}
        `,
      );
    }
  }
};

start();
