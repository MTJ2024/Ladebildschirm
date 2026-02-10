# ❌ YARN IST VERBOTEN! ❌

## WICHTIG: Nur npm verwenden!

Dieses FiveM Ladebildschirm funktioniert **NICHT** mit Yarn!

### Warum kein Yarn?

1. **FiveM Inkompatibilität** - Yarn lockfiles funktionieren nicht auf FiveM Servern
2. **Module Auflösung** - Yarn's Hoisting bricht das FiveM Resource Loading
3. **Build Unterschiede** - Yarn erstellt inkompatible dist Struktur
4. **Server Fehler** - FiveM Server können yarn.lock nicht verarbeiten

### Was passiert wenn man Yarn versucht?

```bash
$ yarn install

Error: 

❌ YARN IS NOT ALLOWED!

⚠️  This FiveM loading screen requires npm.
⚠️  Yarn does not work with FiveM!

✅ Use: npm install
```

**Der preinstall Script blockiert Yarn automatisch!**

### ✅ Richtige Verwendung

```bash
# Installation
npm install

# Development
npm run dev

# Build für FiveM
npm run build
```

### Technische Blockierung

Das Projekt hat mehrere Schichten von Yarn-Blockierung:

1. **preinstall Script** - Wirft Error wenn yarn erkannt wird
2. **package.json engines** - Deklariert Yarn als verboten
3. **.npmrc** - Erzwingt npm mit engine-strict
4. **.gitignore** - Blockiert yarn.lock von commits
5. **.yarnrc.yml** - Warnung für Yarn-Nutzer

**Yarn ist unmöglich zu verwenden in diesem Projekt!**

---

## English Version

# ❌ YARN IS FORBIDDEN! ❌

This FiveM loading screen does **NOT** work with Yarn!

**Use npm only:**
- `npm install`
- `npm run build`

Yarn is actively blocked by preinstall scripts and will fail immediately.
