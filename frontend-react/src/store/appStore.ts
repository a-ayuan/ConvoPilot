import { create } from 'zustand';

interface AppState {
  draft: string;
  goal: string;
  setDraft: (d: string) => void;
  setGoal: (g: string) => void;
}

export const useDraftStore = create<AppState>(set => ({
  draft: '',
  goal: '',
  setDraft: draft => set({ draft }),
  setGoal: goal => set({ goal })
}));
