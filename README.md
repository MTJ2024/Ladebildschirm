<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Greenzone420 - Die Blüte des Feuers

FiveM Loading Screen for Greenzone420 Server

## Installation & Build

**Prerequisites:** Node.js with npm

```bash
npm install
npm run build
```

---

## FiveM Installation

### ⚠️ WICHTIG: NUR dist/ Dateien kopieren!

**FiveM soll NICHT versuchen zu builden!** Nur die fertigen Dateien kopieren.

1. **Build the loading screen:**
   ```bash
   npm install
   npm run build
   ```

2. **Copy to FiveM server:**
   
   **Option A - Nur notwendige Dateien (EMPFOHLEN):**
   ```
   resources/Ladebildschirm/
   ├── fxmanifest.lua      ← Kopieren
   └── dist/               ← Kompletten Ordner kopieren
       ├── index.html
       └── assets/
   ```
   
   **Option B - Gesamten Ordner:**
   - Kopiere den gesamten Ordner
   - FiveM ignoriert automatisch package.json dank `.fxdkignore`
   - `webpack_config 'nope'` verhindert Auto-Build

3. **Add to your `server.cfg`:**
   ```
   ensure Ladebildschirm
   ```

4. **Restart your FiveM server**

### ❌ NICHT auf FiveM Server kopieren:
- `package.json` - Triggert auto-detection!
- `node_modules/` - Nicht benötigt
- Source files (`.tsx`, `.ts`) - Nicht benötigt

---

## Run Locally for Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set the `GEMINI_API_KEY` in `.env.local`** (optional for quotes)

3. **Run dev server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## Features

- Modern, bold design with large visual elements
- Fire-themed ritual circle animation
- Progressive loading stages
- FiveM compatible loadscreen
- Pre-built for easy deployment

---

View in AI Studio: https://ai.studio/apps/drive/19zx446wW67vi-4Vx9zPwOnWRH2oX4Ya8
