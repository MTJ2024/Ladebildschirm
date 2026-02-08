// FiveM NUI Message Types
export interface FiveMLoadingData {
    eventName: string;
    loadFraction: number; // 0.0 to 1.0
}

export interface ServerRule {
    id: number;
    title: string;
    content: string;
}

export interface StaffMember {
    name: string;
    role: string;
    avatarUrl: string;
}

export enum LoadingState {
    CONNECTING = "Verbinde mit Server...",
    DOWNLOADING = "Lade Assets...",
    INIT_SESSION = "Initialisiere Sitzung...",
    FINALIZING = "Betrete GreenZone420..."
}