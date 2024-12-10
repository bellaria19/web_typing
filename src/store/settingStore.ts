import { create } from "zustand";
import { TypingSettings } from "@/types/setting";
import { settingsService } from "@/services/settingService";

/**
 * 사용자 설정 관리를 위한 전역 상태 스토어
 * - 타이핑 관련 설정 관리
 * - 설정 저장 및 로드
 * - UI 설정 적용
 */
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
  // 폰트 크기 설정 적용
  document.documentElement.style.setProperty(
    "--font-scale",
    String(settings.fontSize)
  );
  // 다른 설정들도 필요한 경우 여기에 추가
};

export const useSettingStore = create<SettingState>((set, get) => ({
  // 기본 설정값
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

  /**
   * 사용자 설정 로드
   * @param userId 설정을 로드할 사용자 ID
   */
  loadUserSettings: async (userId: string) => {
    const settings = await settingsService.getUserSettings(userId);
    if (settings) {
      set({ settings, isLoaded: true });
      applySettings(settings);
    }
  },

  /**
   * 설정 업데이트
   * @param key 업데이트할 설정 키
   * @param value 새로운 설정값
   * @param userId 설정을 저장할 사용자 ID (옵션)
   */
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
