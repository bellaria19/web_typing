import { create } from "zustand";
import { Theme } from "@/types/theme";
import themes from "@/assets/_theme.json";

interface ThemeState {
  currentTheme: Theme;
  setTheme: (themeName: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: themes[0],
  setTheme: (themeName) => {
    const selectedTheme = themes.find((theme) => theme.name === themeName);
    console.log(selectedTheme);
    if (selectedTheme) {
      set({ currentTheme: selectedTheme });
    }
  },
}));
