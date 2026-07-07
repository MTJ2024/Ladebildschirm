# MTJ SCRIPTS – Ladebildschirm

Verkaufsbereiter FiveM-Ladebildschirm mit zentraler Konfiguration.

## Schnellstart

Voraussetzung: **Node.js**

1. Abhängigkeiten installieren:
   `npm install`
2. Development-Preview starten:
   `npm run dev`
3. Production-Build erstellen:
   `npm run build`

## Konfiguration

Alle Käufer-Anpassungen laufen über:

- `/home/runner/work/Ladebildschirm/Ladebildschirm/config.ts`

Dort können u. a. geändert werden:

- Servername / Footer / Texte
- Ladephasen
- Header-Text
- KI-Zitate (an/aus, Prompt, Fallback)
- Preview-Geschwindigkeit

## Optionale KI-Zitate (Gemini)

Wenn KI-Zitate genutzt werden sollen, API-Key setzen:

`.env`:
`API_KEY=dein_key`

Wenn kein Key gesetzt ist oder ein Fehler auftritt, wird automatisch der Fallback-Text aus `config.ts` genutzt.
