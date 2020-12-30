/**
 * Imports
 */
const Options = require('./src/Options');
const Translator = require('./src/Translator');
const Reader = require('./src/Reader');
const Parser = require('./src/Parser');
const fs  = require('fs');

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
  const parser = new Parser(content);
  const lines = await parser.getLines();

  const translator = new Translator(lines, options.language);
  const translated = await translator.translate();

  const writer = new NWriter(translated, 'i18n-out.properties');
  await writer.writeFile();
}

main();
