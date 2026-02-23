
export interface LoadingStage {
  id: number;
  label: string;
  subtext: string;
  theme: 'heist' | 'chase' | 'empire' | 'takeover' | 'reign';
}

export enum AppState {
  LOADING = 'LOADING',
  READY = 'READY'
}
