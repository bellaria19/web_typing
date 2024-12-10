import { supabase } from "@/supabase/supabaseClient";
import {
  TypingRecord,
  TypingWord,
  TypingShort,
  TypingLong,
} from "@/types/typing";

/**
 * 타이핑 관련 서비스
 * - 타이핑 기록 저장
 * - 타이핑 연습용 컨텐츠 로드
 */
export const typingService = {
  /**
   * 사용자의 타이핑 기록을 저장
   * @param record 저장할 타이핑 기록 데이터
   * @returns 저장 성공 여부
   */
  async saveRecord(record: TypingRecord): Promise<boolean> {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) {
      console.log("로그인이 필요한 기능입니다.");
      return false;
    }

    try {
      const { error } = await supabase
        .from("typing_records")
        .insert({ ...record, user_id: session.user.id });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("기록 저장 중 오류 발생:", error);
      return false;
    }
  },

  /**
   * 타이핑 연습용 단어 목록을 불러옴
   * @param wordCount 불러올 단어 개수
   * @returns 무작위로 섞인 단어 배열
   */
  async loadWords(wordCount: number): Promise<TypingWord[]> {
    try {
      const { data, error } = await supabase
        .from("typing_words")
        .select("*")
        .limit(wordCount);

      if (error) throw error;
      if (!data || data.length === 0)
        throw new Error("단어를 불러올 수 없습니다.");

      const shuffledData = shuffleArray(data);

      return shuffledData;
    } catch (error) {
      console.error("Error fetching words:", error);
      throw error;
    }
  },

  /**
   * 타이핑 연습용 단문 목록을 불러옴
   * @param shortCount 불러올 단문 개수
   * @returns 무작위로 섞인 단문 배열
   */
  async loadShorts(shortCount: number): Promise<TypingShort[]> {
    try {
      const { data, error } = await supabase
        .from("typing_shorts")
        .select("*")
        .limit(shortCount);

      if (error) throw error;
      if (!data || data.length === 0)
        throw new Error("단문을 불러올 수 없습니다.");

      const shuffledData = shuffleArray(data);

      return shuffledData;
    } catch (error) {
      console.error("Error fetching shorts:", error);
      throw error;
    }
  },

  /**
   * 타이핑 연습용 긴 글 목록을 불러옴
   * @param longCount 불러올 긴 글 개수
   * @returns 무작위로 섞인 긴 글 배열
   */
  async loadLongs(longCount: number): Promise<TypingLong[]> {
    try {
      const { data, error } = await supabase
        .from("typing_longs")
        .select("*")
        .limit(longCount);

      if (error) throw error;
      if (!data || data.length === 0)
        throw new Error("긴 글을 불러올 수 없습니다.");

      const shuffledData = shuffleArray(data);

      return shuffledData;
    } catch (error) {
      console.error("Error fetching longs:", error);
      throw error;
    }
  },
};

/**
 * 배열의 요소를 무작위로 섞는 유틸리티 함수
 * @param array 섞을 배열
 * @returns 무작위로 섞인 새로운 배열
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
