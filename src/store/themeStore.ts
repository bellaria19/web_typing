import { create } from "zustand";
import { Theme } from "@/types/theme";
import themes from "@/assets/_theme.json";

/**
 * 테마 관리를 위한 전역 상태 스토어
 * - 현재 테마 상태 관리
 * - 테마 변경 기능
 */
interface ThemeState {
  currentTheme: Theme;
  setTheme: (themeName: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  // 기본 테마 설정
  currentTheme: themes[0],
  setTheme: (themeName) => {
    const selectedTheme = themes.find((theme) => theme.name === themeName);
    console.log(selectedTheme);
    if (selectedTheme) {
      set({ currentTheme: selectedTheme });
    }
  },
}));
