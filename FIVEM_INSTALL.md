# ⚠️ WICHTIG: FiveM Deployment - NUR DIESE DATEIEN!

## FiveM Server Installation (Windows/Linux)

### ❌ PROBLEM: FiveM versucht zu builden!

Wenn du den GANZEN Ordner kopierst, sieht FiveM `package.json` und versucht automatisch `yarn install` zu starten - **DAS GEHT NICHT!**

### ✅ LÖSUNG: NUR diese Dateien kopieren!

```
resources/Ladebildschirm/
├── fxmanifest.lua       ← Diese Datei
└── dist/                ← Diesen Ordner
    ├── index.html
    └── assets/
        ├── index-C4kJ9iyg.css
        └── index-ChMykeL3.js
```

### 📋 Schritt für Schritt:

1. **Local builden:**
   ```bash
   npm install
   npm run build
   ```

2. **NUR diese Dateien zum FiveM Server kopieren:**
   - `fxmanifest.lua`
   - `dist/` (kompletter Ordner mit allen Inhalten)

3. **NICHT kopieren:**
   - ❌ `package.json`
   - ❌ `package-lock.json`
   - ❌ `node_modules/`
   - ❌ `.npmrc`
   - ❌ Source files (`.tsx`, `.ts`, etc.)

4. **server.cfg:**
   ```
   ensure Ladebildschirm
   ```

5. **Server restart**

### ✅ Resultat

FiveM Log sollte zeigen:
```
Started resource Ladebildschirm
```

**KEIN** `[script:yarn]` sollte erscheinen!

---

## Was ist wenn du den ganzen Ordner kopierst?

FiveM wird versuchen:
```
[script:yarn] yarn install v1.22.5
Building resource Ladebildschirm failed.
```

**Das ist falsch!** FiveM braucht KEINE Build-Tools!

---

## Build Local (für Entwicklung)

```bash
npm install
npm run dev      # Development server
npm run build    # Production build
```

Dann NUR `dist/` + `fxmanifest.lua` kopieren!
