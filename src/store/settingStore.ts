import { create } from "zustand";
import { TypingSettings } from "@/types/setting";
import { settingsService } from "@/services/settingService";

interface SettingState {
  settings: TypingSettings;
  isLoaded: boolean;
  loadUserSettings: (userId: string) => Promise<void>;
  updateSettings: <K extends keyof TypingSettings>(
    key: K,
    value: TypingSettings[K],
    userId?: string
  ) => Promise<void>;
}

const applySettings = (settings: TypingSettings) => {
  document.documentElement.style.setProperty(
    "--font-scale",
    String(settings.fontSize)
  );
  // 다른 설정들도 필요한 경우 여기에 추가
};

export const useSettingStore = create<SettingState>((set, get) => ({
  settings: {
    difficulty: "normal",
    quickRestart: "off",
    blindMode: false,
    confidenceMode: "off",
    indicateTypos: "off",
    fontSize: 1.0,
    smoothCaret: true,
    caretStyle: "block",
    volume: 50,
    clickSound: "off",
    errorSound: "off",
  },
  isLoaded: false,

  loadUserSettings: async (userId: string) => {
    const settings = await settingsService.getUserSettings(userId);
    if (settings) {
      set({ settings, isLoaded: true });
      applySettings(settings);
    }
  },

  updateSettings: async <K extends keyof TypingSettings>(
    key: K,
    value: TypingSettings[K],
    userId?: string
  ) => {
    set((state) => {
      const newSettings = {
        ...state.settings,
        [key]: value,
      };
      applySettings(newSettings);
      return { settings: newSettings, isLoaded: true };
    });

    // 로그인된 사용자인 경우 서버에 설정 저장
    if (userId) {
      const { settings } = get();
      await settingsService.saveUserSettings(userId, settings);
    }
  },
}));
