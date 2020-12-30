/**
 * Imports
 */
const Options = require('./src/Options');
const Translator = require('./src/Translator');
const Reader = require('./src/Reader');
const fs  = require('fs');

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
    const file = process.cwd() + '/out/' + this.file
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
  const options = new Options().getOptions();
  const reader = new Reader(options.file);
  const content = await reader.read();
  const parser = new NParser(content);
  const lines = await parser.getLines();

  const translator = new Translator(lines, options.language);
  const translated = await translator.translate();

  const writer = new NWriter(translated, 'i18n-out.properties');
  await writer.writeFile();
}

main();
