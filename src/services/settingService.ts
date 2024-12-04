import { supabase } from "@/supabase/supabaseClient";
import { TypingSettings } from "@/types/setting";

export const settingsService = {
  async getUserSettings(userId: string): Promise<TypingSettings | null> {
    const { data, error } = await supabase
      .from("user_settings")
      .select("settings")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user settings:", error);
      return null;
    }

    return data?.settings;
  },

  async saveUserSettings(
    userId: string,
    settings: TypingSettings
  ): Promise<boolean> {
    const { error } = await supabase
      .from("user_settings")
      .upsert({ id: userId, settings })
      .select();

    if (error) {
      console.error("Error saving user settings:", error);
      return false;
    }

    return true;
  },
};
