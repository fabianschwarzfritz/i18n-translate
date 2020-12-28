/**
 * Imports
 */
const translate = require('google-translate-api');
const fs  = require('fs');
const fsPromises = fs.promises;

/**
 * Program imports
 */
const args = process.argv.slice(2);
console.log('args: ', args);

if(args.length !== 2) {
  console.log('Wrong program paramter!');
  process.exit(1);
}


const infile = args[0];
const inlanguage = args[1];

/**
 * NReader reads the content of the specified file.
 */
class NReader {
  constructor(file) {
    this.file = file;
  }

  async read() {
    try {
      const file = process.cwd() + '/' + this.file
      return await fsPromises.readFile(file, 'utf8');
    } catch(err) {
      console.log('Could not read file!');
      throw err;
    }
  }
}

/**
 * NParser parses a given i18n file
 */
class NParser {
  constructor(content) {
    this.content = content;
  }

  async getLines() {
    const result = [];
    try {
      const lines = this.content.split('\n');
      lines.forEach((line) => {
        const s = line.split('=');
        const key = s[0];
        const value = s[1];
        if(key === '') {
          return
        }
        result.push({
          key,
          value
        });
      });
    } catch(err) { 
      console.log('Could not split file!');
      throw err;
    }
    return result;
  }
}

/**
 * NTranslator takes the given string
 * and translates it into the specified language.
 */
class NTranslator {
  constructor(i18n, language) {
    this.i18n = i18n;
    this.language = language;
  }

  async translate() {
    const result = [];
    this.i18n.forEach(async (entry) => {
      const text = entry.value;
      let translated = text;
      try {
        const translation = await translate(text, { to: this.language });
        console.log('translation', translation);
        translated = translation.text
      } catch(err) {
        console.log(`Translation error for word '${text}'. Ignoring error.`);
        console.log(err);
      }
      result.push({
        key: entry.key,
        value: translated
      });
    });
  }
}

/**
 * Main program function
 */
const main = async() => {
  const reader = new NReader(infile);
  const content = await reader.read();
  console.log(content);

  const parser = new NParser(content);
  const lines = await parser.getLines();
  console.log(lines);

  const translator = new NTranslator(lines, 'de');
  const translated = await translator.translate();
  console.log(translated);
}

main();

