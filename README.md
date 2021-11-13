# i18n-translate

i18n-translate is a command line tool to auto-translate property files
to various languages from english.

## Installation
Currently no package is provided via `npm`.
I will add an npm package as soon as there is the first release out.

Until now you can install this repository by
1. Cloning the git repository
2. Executing the tool via command line.
   This example will translate the demo file to german:
    ```bash
    npm start <path-to-english-properties-file> <language>
    npm start i18n.properties de
    ```

## Contributing
Pull requests are welcome! Please make sure to update tests in case expected
behavior changes.

## Tests
Tests can be executed by running `npm test`.

## Licence
Check the `LICENCE` file within the root directory.
