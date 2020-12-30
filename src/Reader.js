const fs  = require('fs');
const fsPromises = fs.promises;

/**
 * Reader reads the content of the specified file.
 */
class Reader {
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

module.exports = Reader;
