import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
const LANGUAGES = ['es', 'fr', 'pt', 'de', 'ar', 'hi', 'bn', 'zh', 'ja', 'id', 'tr', 'vi', 'ko', 'ru', 'it', 'pl', 'th', 'tl'];
const SOURCE_FILE = path.resolve(__dirname, '../src/i18n/locales/en.json');
const OUTPUT_DIR = path.resolve(__dirname, '../src/i18n/locales');

async function translateBatch(texts: string[], targetLang: string) {
  if (!API_KEY) {
    throw new Error("GOOGLE_TRANSLATE_API_KEY is not defined in .env");
  }

  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        q: texts,
        target: targetLang,
        format: 'text',
      }
    );
    return response.data.data.translations.map((t: any) => t.translatedText);
  } catch (error: any) {
    console.error(`Error translating to ${targetLang}:`, error.response?.data || error.message);
    return texts;
  }
}

async function main() {
  if (!fs.existsSync(SOURCE_FILE)) {
    console.error("Source file not found at", SOURCE_FILE);
    process.exit(1);
  }

  const sourceData = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf-8'));
  const keys = Object.keys(sourceData);
  const values = Object.values(sourceData) as string[];

  for (const lang of LANGUAGES) {
    console.log(`Translating to ${lang}...`);
    const translatedValues = await translateBatch(values, lang);
    
    const translatedData: Record<string, string> = {};
    keys.forEach((key, index) => {
      translatedData[key] = translatedValues[index];
    });

    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${lang}.json`),
      JSON.stringify(translatedData, null, 2),
      'utf-8'
    );
    console.log(`Done: ${lang}.json`);
  }
}

main().catch(console.error);
