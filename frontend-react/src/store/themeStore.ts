import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeState = {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
};

function applyTheme(dark: boolean) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  root.setAttribute('data-theme', dark ? 'dark' : 'light');
  root.style.setProperty('--fx-intensity', dark ? '1.1' : '0.95');
  root.style.setProperty('--fx-speed', dark ? '1.0' : '1.05');
}

// Prefer system theme on first load if no persisted value yet
const prefersDark =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-color-scheme: dark)').matches;

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: prefersDark ?? true,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
      setTheme: (isDark: boolean) => set({ isDark }),
    }),
    {
      name: 'convopilot-theme',
      // Ensure the correct theme is applied after persist rehydrates
      onRehydrateStorage: () => (state) => {
        // state may be undefined on first run
        const dark = state?.isDark ?? prefersDark ?? true;
        applyTheme(dark);
      },
    }
  )
);

// Apply once immediately (before hydration completes) for no-flash first paint
applyTheme(prefersDark ?? true);

// React to any future changes
useThemeStore.subscribe((s) => applyTheme(s.isDark));
