import { supabase } from "@/supabase/supabaseClient";
import {
  TypingRecord,
  TypingWord,
  TypingShort,
  TypingLong,
} from "@/types/typing";

export const typingService = {
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

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
