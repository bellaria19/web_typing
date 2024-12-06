import { create } from "zustand";
import { TypingSettings } from "@/types/setting";
import { settingsService } from "@/services/settingService";

interface SettingState {
  settings: TypingSettings;
  isLoaded: boolean;
  loadUserSettings: (userId: string) => Promise<void>;
  saveUserSettings: (userId: string) => Promise<void>;
  updateSettings: <K extends keyof TypingSettings>(
    key: K,
    value: TypingSettings[K]
  ) => void;
}

const saveSettings = async (settings: TypingSettings, userId: string) => {
  await settingsService.saveUserSettings(userId, settings);
};

const applySettings = (settings: TypingSettings) => {
  // 폰트 크기 적용
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

  saveUserSettings: async (userId: string) => {
    const { settings } = get();
    await settingsService.saveUserSettings(userId, settings);
  },

  updateSettings: <K extends keyof TypingSettings>(
    key: K,
    value: TypingSettings[K]
  ) => {
    set((state) => {
      const newSettings = {
        ...state.settings,
        [key]: value,
      };
      applySettings(newSettings);
      return { settings: newSettings };
    });
  },
}));

export const saveUserSettingsIfLoggedIn = (userId: string | undefined) => {
  if (userId) {
    const settings = useSettingStore.getState().settings;
    saveSettings(settings, userId);
  }
};
