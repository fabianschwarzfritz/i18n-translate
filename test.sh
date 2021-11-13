#!/bin/bash

echo "Installing package"
npm install

echo "Preparing test directory"
mkdir -p out

echo "Running programm from sample file"
npm start i18n.properties de

echo "Test output"

read -r -d '' EXPECTED << EOM
buttonOk=Okay
buttonCancel=Abbrechen
buttonHeading=Warnung
buttonDisplayPreferences=Präferenzen anzeigen.
buttonDisplayPreferences=Termin
buttonFormatText=Format Text
buttonGrammar=Rechtschreibung & Grammatik.
buttonReceipts=Quittungen anfordern.
buttonAccess=Zugänglichkeit prüfen
textFileDeletion=Möchten Sie die ausgewählten Dateien sicher, dass Sie die ausgewählten Dateien löschen möchten?

EOM

if [[ $(< out/i18n-out.properties) != "$EXPECTED" ]]; then
  echo "ASSERTION ERROR! Generated output is not equal to expected!"
  echo "Here's the diff:"
  diff out/i18n-out.properties <(echo "$EXPECTED")
  exit 1
else
  echo "TEST SUCCESSFUL!"
  exit 0
fi
