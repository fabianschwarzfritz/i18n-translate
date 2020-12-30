/**
 * Imports
 */
const Options = require('./src/Options');
const Translator = require('./src/Translator');
const Reader = require('./src/Reader');
const Parser = require('./src/Parser');
const Writer = require('./src/Writer');

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

  const writer = new Writer(translated, 'i18n-out.properties');
  await writer.writeFile();
}

main();
