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

export const useSettingStore = create<SettingsState>((set, get) => ({
  settings: {
    behavior: {
      difficulty: "normal",
      quickRestart: "off",
      blindMode: false,
      confidenceMode: "off",
      indicateTypos: "off",
      language: "ko",
    },
    appearance: {
      fontSize: 16,
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
    set((state) => ({
      settings: {
        ...state.settings,
        appearance: {
          ...state.settings.appearance,
          [key]: value,
        },
      },
    }));
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
