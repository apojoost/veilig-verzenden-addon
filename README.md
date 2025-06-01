// ------------------- README.md -------------------
# Veilig Verzenden Thunderbird Add-on

Met deze add-on verstuur je met één klik e-mail via je Zorgmail-account.

## Bestandsstructuur
```
veilig-verzenden-addon/
├── manifest.json
├── background.js
├── icons/
│   ├── send-16.png
│   ├── send-32.png
│   ├── send-48.png
│   └── send-128.png
└── README.md
```

## Manifest aanpassingen
- **Root `icons`**: toegevoegd om het icoon in de extensie-lijst te laten zien (16, 32, 48, 128 px).
- **Compose knoppen `default_icon`**: blijft 16 en 32 px.

## Iconen toevoegen
Plaats in `icons/`:
- `send-16.png` (16×16)
- `send-32.png` (32×32)
- `send-48.png` (48×48)
- `send-128.png` (128×128)

## Installatie (dev & eindgebruiker)
Zie eerdere instructies voor Debug Add-ons en `.xpi`-installatie.

  ## Alternatief: XPI-pakket maken
Wil je liever een .xpi-bestand dat je kunt delen/installeren zonder ontwikkelmodus?
Zip de inhoud van veilig-verzenden-addon/ (dus niet de map zelf, maar de bestanden) en hernoem addon.zip naar veilig-verzenden.xpi.
In Thunderbird: Extra → Add-ons en thema’s → Extensies, klik op het tandwieltje en kies Add-on installeren vanuit bestand…, selecteer de .xpi.
Installeer en herstart Thunderbird.

## Structuur
- `manifest.json`: configuratie van de add-on.
- `background.js`: logica voor de "Veilig Verzenden"-knop.
- `icons/`: bevat de iconen
