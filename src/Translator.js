const translate = require('translatte');

/**
 * Translator takes the given string
 * and translates it into the specified language.
 */
class Translator {
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

module.exports = Translator;
