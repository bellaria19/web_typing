import { supabase } from "@/supabase/supabaseClient";
import { TypingSettings } from "@/types/setting";

export const settingsService = {
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

    return {
      difficulty: data.difficulty,
      quickRestart: data.quick_restart,
      blindMode: data.blind_mode,
      confidenceMode: data.confidence_mode,
      indicateTypos: data.indicate_typos,
      fontSize: data.font_size,
      smoothCaret: data.smooth_caret,
      caretStyle: data.caret_style,
      volume: data.volume,
      clickSound: data.click_sound,
      errorSound: data.error_sound,
    };
  },

  async saveUserSettings(
    userId: string,
    settings: TypingSettings
  ): Promise<boolean> {
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
