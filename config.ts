// ================================================================
// MTJ SCRIPTS – LADEBILDSCHIRM KONFIGURATION
// ================================================================
// Hier kannst du alle Einstellungen für deinen Ladebildschirm
// anpassen. Ändere nur die Werte nach dem „:" – nicht die
// Bezeichnungen davor!
//
// TIPP: Speichere die Datei nach jeder Änderung und baue das
//       Script neu (npm run build), damit die Änderungen aktiv
//       werden.
// ================================================================

export const CONFIG = {

  // ----------------------------------------------------------------
  // SERVER-INFORMATIONEN
  // ----------------------------------------------------------------

  /** Dein Servername – wird im Fertig-Bildschirm groß angezeigt */
  serverName: "MTJSCRIPTS",

  /** Kurzer Untertitel direkt unter dem Servernamen (Fertig-Bildschirm) */
  serverTagline: "Bereit zum Spielen",

  /** Kleiner Text ganz unten im Fertig-Bildschirm */
  serverReady: "Eintritt Gewährt",

  /** Footer-Zeile während des Ladens (z. B. Server • Team) */
  serverFooter: "MTJSCRIPTS • 2025",

  // ----------------------------------------------------------------
  // LADEBILDSCHIRM – PHASEN
  // Passe die Bezeichnungen der Ladephasen an deinen Server an.
  // Du kannst Zeilen hinzufügen oder entfernen – mindestens eine
  // Zeile muss jedoch vorhanden bleiben.
  // Verfügbare Themes: 'awakening' | 'purification' | 'enlightenment' | 'arrival'
  // ----------------------------------------------------------------

  loadingStages: [
    { id: 1, label: "Verbindung",       subtext: "Die Brücke wird geschlagen.",           theme: "awakening"     as const },
    { id: 2, label: "Ressourcen",       subtext: "Inhalte werden geladen.",               theme: "purification"  as const },
    { id: 3, label: "Initialisierung",  subtext: "Die Welt erwacht.",                     theme: "enlightenment" as const },
    { id: 4, label: "Synchronisation",  subtext: "Spieler werden eingebunden.",           theme: "arrival"       as const },
    { id: 5, label: "Bereit",           subtext: "Willkommen auf dem Server.",            theme: "arrival"       as const },
  ],

  // ----------------------------------------------------------------
  // LADE-KOPFZEILE
  // Kleiner dekorativer Text über dem Haupttitel während des Ladens
  // ----------------------------------------------------------------

  /** Dekorative Kopfzeile (Trennzeichen zwischen den Wörtern wählbar) */
  loadingHeader: "Laden • Starten • Spielen",

  // ----------------------------------------------------------------
  // KI-ZITATE (OPTIONAL)
  // Der Ladebildschirm kann automatisch passende Zitate per KI
  // generieren. Dafür wird ein Google Gemini API-Key benötigt.
  //
  // API-Key einrichten:
  //   1. Gehe zu https://aistudio.google.com/app/apikey
  //   2. Erstelle einen kostenlosen API-Key
  //   3. Setze die Umgebungsvariable API_KEY in deiner .env-Datei:
  //      API_KEY=DeinKeyHier
  //
  // Wenn kein API-Key vorhanden ist, wird useAI automatisch
  // ignoriert und der Fallback-Text angezeigt.
  // ----------------------------------------------------------------

  /** KI-Zitate aktivieren (true = an, false = aus) */
  useAI: true,

  /**
   * KI-Prompt: Beschreibt den Stil der generierten Zitate.
   * {stage} wird durch den aktuellen Phasennamen ersetzt.
   */
  aiPrompt:
    'Erstelle einen kurzen, stimmungsvollen deutschen Satz (max. 12 Wörter) passend zum Thema "{stage}". ' +
    'Nutze bildhafte Sprache. Der Ton sollte einladend und geheimnisvoll sein.',

  /** Zitat, das angezeigt wird wenn die KI nicht verfügbar ist */
  fallbackQuote: "Geduld ist der Schlüssel zur besten Erfahrung.",

  // ----------------------------------------------------------------
  // PREVIEW-MODUS (nur für Entwickler/Vorschau)
  // Im Browser (ohne FiveM) läuft eine Demo-Animation.
  // Hier stellst du ein, wie schnell der Balken sich füllt.
  // ----------------------------------------------------------------

  /** Fortschritt pro Tick in Prozent (kleiner = langsamer) */
  previewSpeed: 0.35,

  /** Millisekunden zwischen jedem Tick */
  previewInterval: 50,

};
