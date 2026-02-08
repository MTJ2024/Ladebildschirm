# GreenZone420 – FiveM Ladebildschirm

Premium Loading Screen für FiveM ESX Server mit AI-generierten RP-Tipps, Neon-Ästhetik und integriertem Music-Player.

## Features

- **Neon Green Design** – Glassmorphism-UI mit Scanline-Effekten und animiertem Hintergrund
- **Ladefortschritt** – Echtzeit-Fortschrittsanzeige über FiveM NUI-Events
- **AI RP-Tipps** – Dynamische Tipps via Google Gemini (mit Fallback-Tipps ohne API-Key)
- **Music Player** – Play/Pause, Lautstärkeregler, Loop-Funktion
- **Responsive** – Funktioniert auf allen Bildschirmgrößen

## Voraussetzungen

- [Node.js](https://nodejs.org/) (v18+)
- Ein FiveM Server mit ESX Framework

## Installation

1. Repository klonen oder herunterladen:
   ```bash
   git clone https://github.com/MTJ2024/Ladebildschirm.git
   ```

2. In das Projektverzeichnis wechseln und Abhängigkeiten installieren:
   ```bash
   cd Ladebildschirm/greenzone420-loading-screen
   npm install
   ```

3. **(Optional)** Gemini API-Key für AI-Tipps konfigurieren – erstelle eine `.env.local` Datei:
   ```
   GEMINI_API_KEY=dein_api_key_hier
   ```

4. Projekt bauen:
   ```bash
   npm run build
   ```

5. Den gesamten `greenzone420-loading-screen` Ordner in den `resources/` Ordner deines FiveM Servers kopieren.

6. In der `server.cfg` die Ressource aktivieren:
   ```cfg
   ensure greenzone420-loading-screen
   ```

7. Server neustarten – fertig!

## Entwicklung

Lokalen Entwicklungsserver starten (Browser-Vorschau mit simuliertem Ladefortschritt):

```bash
cd greenzone420-loading-screen
npm install
npm run dev
```

Öffne `http://localhost:3000` im Browser.

## Projektstruktur

```
greenzone420-loading-screen/
├── fxmanifest.lua          # FiveM Resource-Manifest
├── html/                   # Build-Output (wird von FiveM geladen)
├── components/
│   ├── Background.tsx      # Animierter Hintergrund
│   ├── LoadingBar.tsx      # Fortschrittsbalken
│   ├── MusicPlayer.tsx     # Musik-Player
│   └── AiStatus.tsx        # AI-generierte Tipps
├── services/
│   └── geminiService.ts    # Google Gemini API Integration
├── App.tsx                 # Hauptkomponente
├── index.html              # HTML Entry-Point
├── index.tsx               # React Entry-Point
├── types.ts                # TypeScript Typen
├── vite.config.ts          # Build-Konfiguration
└── package.json            # Abhängigkeiten
```

## Anpassung

- **Musik ändern**: URL in `components/MusicPlayer.tsx` (`MUSIC_URL`) anpassen
- **Hintergrundbild**: URL in `components/Background.tsx` anpassen
- **Server-Infos**: Texte in `App.tsx` (Discord-Link, Servername etc.) bearbeiten
- **Farben**: Tailwind CSS Klassen anpassen (grün → andere Farbe)