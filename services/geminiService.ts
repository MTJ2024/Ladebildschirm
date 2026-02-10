// Static poetic quotes for each loading stage
const THEMATIC_QUOTES: Record<string, string[]> = {
  'Wurzel im Schatten': [
    'Wo Feuer war, blüht nun die Freiheit.',
    'Die Knospe des Lichts öffnet sich.',
    'Aus Asche erwacht die Pracht.',
  ],
  'Keimen der Glut': [
    'Durch Flammen zur Klarheit.',
    'Im Feuer wird Gold geboren.',
    'Die Glut reinigt die Seele.',
  ],
  'Blüte des Feuers': [
    'Das Licht durchbricht die Nacht.',
    'Erkenntnis tanzt in Flammen.',
    'Die Wahrheit erglüht golden.',
  ],
  'Der Garten der Freiheit': [
    'Willkommen in Greenzone420.',
    'Die Blüte ist erwacht.',
    'Ein neuer Tag bricht an.',
  ],
  'GZ420 Vollendung': [
    'Das Schicksal ist aufgeblüht.',
    'Die Vollendung naht.',
    'Der Kreis schließt sich.',
  ],
  'default': [
    'In der Asche ruht die Pracht.',
    'Wurzeln schlagen tief.',
    'Der Phönix steigt empor.',
  ]
};

export async function getThematicQuote(stage: string): Promise<string> {
  // Get quotes for the specific stage or use default
  const quotes = THEMATIC_QUOTES[stage] || THEMATIC_QUOTES['default'];
  
  // Return a random quote from the available options
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}
