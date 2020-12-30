/**
 * Parser parses a given i18n file
 */
class Parser {
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

module.exports = Parser;
