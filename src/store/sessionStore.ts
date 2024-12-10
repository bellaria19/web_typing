import { create } from "zustand";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/supabase/supabaseClient";

/**
 * 세션 관리를 위한 전역 상태 스토어
 * - 세션 상태 관리
 * - 세션 갱신 및 유효성 검사
 */
interface SessionState {
  session: Session | null;
  setSession: (session: Session | null) => void;
  clearSession: () => void;
  refreshSession: () => Promise<void>;
  isSessionValid: () => boolean;
  getSessionExpiresIn: () => number;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  session: null,
  setSession: (session) => set({ session }),
  clearSession: () => set({ session: null }),
  refreshSession: async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.refreshSession();
      if (error) throw error;
      if (session) {
        set({ session });
      }
    } catch (error) {
      console.error("세션 갱신 중 오류 발생:", error);
      set({ session: null });
    }
  },

  /**
   * 세션 유효성 검사
   * @returns 세션이 유효한지 여부
   */
  isSessionValid: () => {
    const session = get().session;
    if (!session) return false;

    const now = Math.floor(Date.now() / 1000);
    if (!session.expires_at) return false;
    return session.expires_at > now;
  },

  /**
   * 세션 만료까지 남은 시간 계산
   * @returns 만료까지 남은 시간(초)
   */
  getSessionExpiresIn: () => {
    const session = get().session;
    if (!session) return 0;

    const now = Math.floor(Date.now() / 1000);
    if (!session.expires_at) return 0;
    return session.expires_at - now;
  },
}));
