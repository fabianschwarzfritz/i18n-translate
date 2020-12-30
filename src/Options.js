/**
 * The paramters of the program
 */
class Options {
  constructor() {
    this.args = process.argv;
  }

  getOptions() {
    if(this.args.length !== 4) {
      console.log('Wrong program paramters!');
      console.log('Sample usage:')
      console.log('  translate <file> <language-initials>')
      console.log('  translate i18n.properties de')
      process.exit(0);
    }

    return {
      file: this.args[2],
      language: this.args[3],
    }
  }
}

module.exports = Options
