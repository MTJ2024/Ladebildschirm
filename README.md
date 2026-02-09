# GreenZone420 – FiveM Ladebildschirm

Premium Loading Screen für FiveM ESX Server mit RP-Tipps, Neon-Ästhetik und integriertem Music-Player.

## Installation

1. Repository herunterladen und den `Ladebildschirm` Ordner in `resources/` kopieren.

2. In der `server.cfg`:
   ```cfg
   ensure Ladebildschirm
   ```

3. Server neustarten – fertig!

> Die `html/` Dateien sind bereits fertig gebaut. Kein `npm install` oder Build nötig.

## Neu bauen (optional)

Falls du den Quellcode ändern willst:

```bash
cd Ladebildschirm/build
npm install
npm run build
```

Die gebauten Dateien landen automatisch in `html/`.

## Projektstruktur

```
Ladebildschirm/              ← in resources/ kopieren
├── fxmanifest.lua           # FiveM Resource-Manifest
├── html/                    # Fertige Dateien (wird von FiveM geladen)
│   ├── index.html
│   └── assets/
└── build/                   # Quellcode & Build-Tools
    ├── package.json
    ├── vite.config.ts
    └── src/
        ├── App.tsx
        ├── components/
        └── services/
```

## Anpassung

- **Musik ändern**: URL in `build/src/components/MusicPlayer.tsx` (`MUSIC_URL`) anpassen
- **Server-Infos**: Texte in `build/src/App.tsx` (Discord-Link, Servername etc.) bearbeiten
- **Farben**: Tailwind CSS Klassen anpassen (grün → andere Farbe)

Nach Änderungen: `cd build && npm run build`