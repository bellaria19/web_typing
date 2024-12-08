import { create } from "zustand";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/supabase/supabaseClient";

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
  isSessionValid: () => {
    const session = get().session;
    if (!session) return false;

    const now = Math.floor(Date.now() / 1000);
    if (!session.expires_at) return false;
    return session.expires_at > now;
  },
  getSessionExpiresIn: () => {
    const session = get().session;
    if (!session) return 0;

    const now = Math.floor(Date.now() / 1000);
    if (!session.expires_at) return 0;
    return session.expires_at - now;
  },
}));
