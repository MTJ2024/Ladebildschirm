
export interface LoadingStage {
  id: number;
  label: string;
  subtext: string;
  theme: 'awakening' | 'purification' | 'enlightenment' | 'arrival';
}

export enum AppState {
  LOADING = 'LOADING',
  READY = 'READY'
}
