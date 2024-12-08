import { supabase } from "@/supabase/supabaseClient";
import { UploadData } from "@/types/upload";

export const uploadService = {
  async uploadContent(data: UploadData): Promise<boolean> {
    try {
      const table =
        data.type.value === "short" ? "typing_shorts" : "typing_longs";

      const { error } = await supabase.from(table).insert({
        content: data.content,
        description: data.description,
        category: data.category,
        user_id: data.user_id,
      });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("컨텐츠 업로드 중 오류 발생:", error);
      return false;
    }
  },
};
