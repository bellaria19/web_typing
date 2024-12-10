import { supabase } from "@/supabase/supabaseClient";
import { TypingSettings } from "@/types/setting";

/**
 * 사용자 설정 관련 서비스
 * - 사용자별 타이핑 설정 관리
 * - 설정 저장 및 불러오기
 */
export const settingsService = {
  /**
   * 사용자의 타이핑 설정을 불러옴
   * @param userId 설정을 불러올 사용자 ID
   * @returns 사용자 설정 객체 또는 null
   */
  async getUserSettings(userId: string): Promise<TypingSettings | null> {
    const { data, error } = await supabase
      .from("user_settings")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user settings:", error);
      return null;
    }

    if (!data) return null;

    // 데이터베이스 컬럼명을 클라이언트 설정 객체로 매핑
    return {
      difficulty: data.difficulty, // 난이도 설정
      quickRestart: data.quick_restart, // 빠른 재시작 옵션
      blindMode: data.blind_mode, // 블라인드 모드
      confidenceMode: data.confidence_mode, // 자신감 모드
      indicateTypos: data.indicate_typos, // 오타 표시 여부
      fontSize: data.font_size, // 글자 크기
      smoothCaret: data.smooth_caret, // 부드러운 캐럿 움직임
      caretStyle: data.caret_style, // 캐럿 스타일
      volume: data.volume, // 소리 크기
      clickSound: data.click_sound, // 클릭 소리 설정
      errorSound: data.error_sound, // 오류 소리 설정
    };
  },

  /**
   * 사용자의 타이핑 설정을 저장
   * @param userId 설정을 저장할 사용자 ID
   * @param settings 저장할 설정 객체
   * @returns 저장 성공 여부
   */
  async saveUserSettings(
    userId: string,
    settings: TypingSettings
  ): Promise<boolean> {
    // upsert를 사용하여 새로운 설정 추가 또는 기존 설정 업데이트
    const { error } = await supabase
      .from("user_settings")
      .upsert({
        id: userId,
        difficulty: settings.difficulty,
        quick_restart: settings.quickRestart,
        blind_mode: settings.blindMode,
        confidence_mode: settings.confidenceMode,
        indicate_typos: settings.indicateTypos,
        font_size: settings.fontSize,
        smooth_caret: settings.smoothCaret,
        caret_style: settings.caretStyle,
        volume: settings.volume,
        click_sound: settings.clickSound,
        error_sound: settings.errorSound,
      })
      .select();

    if (error) {
      console.error("Error saving user settings:", error);
      return false;
    }

    return true;
  },
};
