import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/supabase/supabaseClient";
import { Session, User } from "@supabase/supabase-js";
import { useSettingStore } from "@/store/settingStore";
import { useSessionStore } from "@/store/sessionStore";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { loadUserSettings } = useSettingStore();
  const {
    session,
    setSession,
    clearSession,
    refreshSession,
    isSessionValid,
    getSessionExpiresIn,
  } = useSessionStore();

  const initializeUser = useCallback(
    async (session: Session) => {
      try {
        setUser(session.user);
        await loadUserSettings(session.user.id);
      } catch (error) {
        console.error("사용자 초기화 중 오류 발생:", error);
        clearSession();
        setUser(null);
      }
    },
    [loadUserSettings, clearSession]
  );

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession();

        if (initialSession && isSessionValid()) {
          setSession(initialSession);
          await initializeUser(initialSession);
        } else if (initialSession) {
          await refreshSession();
        }
      } catch (error) {
        console.error("초기 인증 상태 확인 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [setSession, refreshSession, isSessionValid, initializeUser]);

  // 세션 변경 감지
  useEffect(() => {
    if (session && !user) {
      initializeUser(session);
    }
  }, [session, user, initializeUser]);

  return {
    user,
    loading,
    isAuthenticated: isSessionValid() && !!user,
    sessionExpiresIn: getSessionExpiresIn(),
  };
};
