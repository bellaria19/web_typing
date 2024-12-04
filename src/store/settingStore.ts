import { create } from "zustand";
import { TypingSettings } from "@/types/setting";
import { settingsService } from "@/services/settingService";

interface SettingsState {
  settings: TypingSettings;
  isLoaded: boolean;
  loadUserSettings: (userId: string) => Promise<void>;
  saveUserSettings: (userId: string) => Promise<void>;
  updateBehavior: <K extends keyof TypingSettings["behavior"]>(
    key: K,
    value: TypingSettings["behavior"][K]
  ) => void;
  updateAppearance: <K extends keyof TypingSettings["appearance"]>(
    key: K,
    value: TypingSettings["appearance"][K]
  ) => void;
  updateSound: <K extends keyof TypingSettings["sound"]>(
    key: K,
    value: TypingSettings["sound"][K]
  ) => void;
}

const saveSettings = async (settings: TypingSettings, userId: string) => {
  await settingsService.saveUserSettings(userId, settings);
};

const applySettings = (settings: TypingSettings) => {
  // 폰트 크기 적용
  document.documentElement.style.setProperty(
    "--font-scale",
    String(settings.appearance.fontSize)
  );

  // 다른 설정들도 필요한 경우 여기에 추가
};

export const useSettingStore = create<SettingsState>((set, get) => ({
  settings: {
    behavior: {
      difficulty: "normal",
      quickRestart: "off",
      blindMode: false,
      confidenceMode: "off",
      indicateTypos: "off",
    },
    appearance: {
      fontSize: 1.0,
      smoothCaret: true,
      caretStyle: "block",
    },
    sound: {
      volume: 50,
      clickSound: "off",
      errorSound: "off",
    },
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

  updateBehavior: (key, value) => {
    set((state) => ({
      settings: {
        ...state.settings,
        behavior: {
          ...state.settings.behavior,
          [key]: value,
        },
      },
    }));
  },

  updateAppearance: (key, value) => {
    set((state) => {
      const newSettings = {
        ...state.settings,
        appearance: {
          ...state.settings.appearance,
          [key]: value,
        },
      };
      applySettings(newSettings);
      return { settings: newSettings };
    });
  },

  updateSound: (key, value) => {
    set((state) => ({
      settings: {
        ...state.settings,
        sound: {
          ...state.settings.sound,
          [key]: value,
        },
      },
    }));
  },
}));

export const saveUserSettingsIfLoggedIn = (userId: string | undefined) => {
  if (userId) {
    const settings = useSettingStore.getState().settings;
    saveSettings(settings, userId);
  }
};
