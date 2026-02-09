# Greenzone420 - Der Befreier FiveM Loading Screen

Eine atmosphärische Ladebildschirm-Erfahrung, die Themen von Opfer, Auferstehung und Befreiung verbindet, mit hochwertiger visueller Ästhetik für Greenzone420.

## Features

- 🔥 Animierte Flammen und Partikeleffekte
- ⚡ Dynamische Ladefortschrittsanzeige
- 🎨 Thematische Farbübergänge (Rot → Orange → Grün)
- ✨ Göttliche Lichtstrahlen und Aura-Effekte
- 📱 Responsive Design
- 🎮 FiveM-kompatibel mit Echtzeit-Fortschrittsverfolgung

## Installation für FiveM Server

### Methode 1: Direkter Download (Empfohlen)

1. Lade dieses gesamte Repository herunter
2. Kopiere den Ordner in deinen FiveM Server-Ordner unter `resources/`
3. Benenne den Ordner in `greenzone420-loadscreen` um (oder einen anderen Namen)
4. Füge folgende Zeile in deine `server.cfg` hinzu:
   ```
   ensure greenzone420-loadscreen
   ```
5. Starte deinen Server neu

### Methode 2: Aus dem Source-Code bauen

Wenn du Änderungen am Code vornehmen möchtest:

1. Klone das Repository:
   ```bash
   git clone https://github.com/MTJ2024/Ladebildschirm.git
   cd Ladebildschirm
   ```

2. Installiere die Abhängigkeiten:
   ```bash
   npm install
   ```

3. Baue das Projekt:
   ```bash
   npm run build
   ```

4. Kopiere den gesamten Ordner in `resources/` deines FiveM Servers

5. Füge in die `server.cfg` ein:
   ```
   ensure Ladebildschirm
   ```

## Dateistruktur

```
Ladebildschirm/
├── fxmanifest.lua          # FiveM Manifest-Datei
├── dist/                   # Gebaute Produktionsdateien
│   ├── index.html         # Haupt-HTML-Datei
│   └── assets/            # JS/CSS Assets
├── App.tsx                # Haupt-React-Komponente
├── components/            # React-Komponenten
├── services/              # API-Services
└── package.json           # Node.js Abhängigkeiten
```

## Entwicklung

Für lokale Entwicklung:

```bash
npm run dev
```

Der Entwicklungsserver startet auf `http://localhost:3000`

## Konfiguration

Die Ladebildschirm-Stages sind in `constants.tsx` definiert:

1. **Michaels Schmerz** - Das Erwachen (Rot)
2. **Luzifers Flüstern** - Die Reinigung (Orange)
3. **Erzengel der Freiheit** - Die Erleuchtung (Grün)
4. **Der Befreier Kommt** - Die Ankunft (Hell-Grün)
5. **Greenzone Manifest** - Manifestation (Weiß)

## Themen

Die Ladebildschirm-Erfahrung basiert auf der Geschichte von:
- 🔥 Gefallener Erzengel Michael
- ⚡ Lucifer - Das brennende Licht
- 🌿 Greenzone420 - Das Reich des Befreiers

## Technische Details

- **Framework**: React 19 mit TypeScript
- **Build-Tool**: Vite
- **Styling**: TailwindCSS
- **FiveM Events**: Unterstützt `loadProgress` und `onStatusLine` Events

## Fehlerbehebung

### Ladebildschirm wird nicht angezeigt

1. Überprüfe, ob die Ressource in der `server.cfg` aktiviert ist
2. Stelle sicher, dass alle Dateien im `dist/` Ordner vorhanden sind
3. Überprüfe die Server-Konsole auf Fehler

### Build-Fehler

Wenn `npm run build` fehlschlägt:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Credits

- Entwickelt von MTJ2024
- Design-Konzept: Greenzone420 - Der Befreier
- Themen: Michael, Lucifer, Göttliches Feuer

## Lizenz

Dieses Projekt ist für den privaten Gebrauch auf dem Greenzone420 Server bestimmt.

---

**Viel Erfolg mit dem Greenzone420 Ladebildschirm! 🔥⚡🌿**
