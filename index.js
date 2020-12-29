/**
 * Imports
 */
const translate = require('translatte');
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
    for(const entry of this.i18n) {
      const text = entry.value;
      let translated = text;
      try {
        const translation = await translate(text, { to: this.language });
        translated = translation.text
        console.log(translated);
      } catch(err) {
        console.log(`Translation error for word '${text}'. Ignoring error.`);
        console.log(err);
      }
      result.push({
        key: entry.key,
        value: translated
      });
    };
    return result;
  }
}

/**
 * NWriter writes the translated files to an i18n file
 */
class NWriter {
  constructor(translation, file) {
    this.translation = translation;
    this.file = file;
  }

  async writeFile() {
    let text = "";
    for(const entry of this.translation) {
      text = text + entry.key + "=" + entry.value + "\n";
    }

    console.log(text);
    const file = process.cwd() + '/' + this.file
    try{
      fs.writeFileSync(file, text);
    } catch(err) {
      console.log(`Error writing file ${this.file}`);
    }
  }
}

/**
 * Main program function
 */
const main = async() => {
  const reader = new NReader(infile);
  const content = await reader.read();
  const parser = new NParser(content);
  const lines = await parser.getLines();

  const translator = new NTranslator(lines, 'de');
  const translated = await translator.translate();
  console.log(translated);
  console.log(translated);

  const writer = new NWriter(translated, 'i18n-de.properties');
  await writer.writeFile();
}

main();
