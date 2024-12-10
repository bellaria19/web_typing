import { supabase } from "@/supabase/supabaseClient";
import { UploadData } from "@/types/upload";

/**
 * 사용자 제작 컨텐츠 업로드 서비스
 */
export const uploadService = {
  /**
   * 새로운 타이핑 연습 컨텐츠를 업로드
   * @param data 업로드할 컨텐츠 데이터 (단문 또는 긴 글)
   * @returns 업로드 성공 여부
   */
  async uploadContent(data: UploadData): Promise<boolean> {
    try {
      // 컨텐츠 타입에 따라 적절한 테이블 선택
      const table =
        data.type.value === "short" ? "typing_shorts" : "typing_longs";

      // 데이터베이스에 컨텐츠 삽입
      const { error } = await supabase.from(table).insert({
        content: data.content, // 실제 타이핑 컨텐츠
        description: data.description, // 컨텐츠 설명
        category: data.category, // 컨텐츠 카테고리
        user_id: data.user_id, // 업로드한 사용자 ID
      });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("컨텐츠 업로드 중 오류 발생:", error);
      return false;
    }
  },
};
