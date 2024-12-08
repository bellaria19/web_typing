import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@/hooks/useNavigation";
import { useSessionStore } from "@/store/sessionStore";
import { ROUTES } from "@/constants/routes";

export const withAuthProtection = (WrappedComponent: React.ComponentType) => {
  return function ProtectedRoute() {
    const { user, loading } = useAuth();
    const { navigateTo } = useNavigation();
    const { isSessionValid, refreshSession } = useSessionStore();

    useEffect(() => {
      const checkAuth = async () => {
        if (!loading) {
          if (!user || !isSessionValid()) {
            try {
              await refreshSession();
              // refreshSession 후에도 세션이 유효하지 않으면 로그인 페이지로 이동
              if (!isSessionValid()) {
                alert("로그인이 필요한 서비스입니다.");
                navigateTo(ROUTES.LOGIN);
              }
            } catch (error) {
              console.error("세션 갱신 실패:", error);
              alert("로그인이 필요한 서비스입니다.");
              navigateTo(ROUTES.LOGIN);
            }
          }
        }
      };

      checkAuth();
    }, [user, loading, navigateTo, isSessionValid, refreshSession]);

    if (loading) return null;
    if (!user || !isSessionValid()) return null;

    return <WrappedComponent />;
  };
};
