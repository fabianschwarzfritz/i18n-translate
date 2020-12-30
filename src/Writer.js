const fs  = require('fs');

/**
 * Writer writes the translated files to an i18n file
 */
class Writer {
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
    try {
      fs.writeFileSync(file, text);
    } catch(err) {
      console.log(`Error writing file ${this.file}`);
    }
  }
}

module.exports = Writer;
