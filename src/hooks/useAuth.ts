import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/supabase/supabaseClient";
import { Session, User } from "@supabase/supabase-js";
import { useSettingStore } from "@/store/settingStore";
import { useSessionStore } from "@/store/sessionStore";

/**
 * 사용자 인증 상태를 관리하는 커스텀 훅
 * - 사용자 정보 관리
 * - 세션 상태 관리
 * - 인증 상태 초기화
 */
export const useAuth = () => {
  // 사용자 상태 관리
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 전역 상태 관리 스토어
  const { loadUserSettings } = useSettingStore();
  const {
    session,
    setSession,
    clearSession,
    refreshSession,
    isSessionValid,
    getSessionExpiresIn,
  } = useSessionStore();

  /**
   * 사용자 정보 초기화 함수
   * - 사용자 상태 설정
   * - 사용자 설정 로드
   */
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

  /**
   * 초기 인증 상태 설정
   * - 페이지 로드 시 실행
   * - 세션 유효성 검사
   * - 필요시 세션 갱신
   */
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

  /**
   * 세션 변경 감지 및 사용자 정보 동기화
   * - 세션이 있지만 사용자 정보가 없는 경우 초기화
   */
  useEffect(() => {
    if (session && !user) {
      initializeUser(session);
    }
  }, [session, user, initializeUser]);

  // 훅의 반환값
  return {
    user, // 현재 사용자 정보
    loading, // 로딩 상태
    isAuthenticated: isSessionValid() && !!user, // 인증 여부
    sessionExpiresIn: getSessionExpiresIn(), // 세션 만료 시간
  };
};
