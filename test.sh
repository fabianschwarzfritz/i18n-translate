#!/bin/bash

echo "Installing package"
npm install

echo "Runnig Programm from sample file"
npm start i18n.properties de

echo "Test output"

read -r -d '' EXPECTED << EOM
buttonOk=In Ordnung
buttonCancel=Stornieren
buttonHeading=Warnung
buttonDisplayPreferences=Präferenzen anzeigen.
buttonDisplayPreferences=Geplanter Termin
buttonFormatText=Format Text
buttonGrammar=Rechtschreibung & Grammatik.
buttonReceipts=Quittungen anfordern.
buttonAccess=Zugänglichkeit prüfen
textFileDeletion=Möchten Sie die ausgewählten Dateien sicher, dass Sie die ausgewählten Dateien löschen möchten?

EOM

if [[ $(< out/i18n-out.properties) != "$EXPECTED" ]]; then
  echo "ASSERTION ERROR! Generated output is not equal to expected!"
  exit 1
else
  echo "TEST SUCCESSFUL!"
  exit 0
fi
