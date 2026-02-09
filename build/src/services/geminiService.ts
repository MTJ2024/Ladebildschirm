// Fallback tips - used directly in FiveM loadscreen (no external API needed)
const FALLBACK_TIPS = [
    "Halte dich an die Verkehrsregeln, auch wenn du high bist.",
    "Respektiere die Medics, sie retten deinen Arsch.",
    "Das Weed-Feld ist nicht die einzige Einnahmequelle. Sei kreativ.",
    "GreenZone420 ist ein Safe Space für gutes RP, kein GTA Online.",
    "Benutze /me und /do für besseres Roleplay.",
    "Dein Charakter ist nicht du. Trenne IC und OOC.",
    "Gib Neulingen eine Chance - jeder hat mal angefangen.",
    "Powergaming ist verboten. Lass anderen auch Spaß.",
    "Nutze Voice-RP für mehr Immersion.",
    "Lies das Regelwerk bevor du loslegst!"
];

export const generateRpTip = async (): Promise<string> => {
    return FALLBACK_TIPS[Math.floor(Math.random() * FALLBACK_TIPS.length)];
};