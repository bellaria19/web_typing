import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@/hooks/useNavigation";
import { ROUTES } from "@/constants/routes";

export const withAuthProtection = (WrappedComponent: React.ComponentType) => {
  return function ProtectedRoute() {
    const { user, loading } = useAuth();
    const { navigateTo } = useNavigation();

    useEffect(() => {
      if (!loading && !user) {
        alert("로그인이 필요한 서비스입니다.");
        navigateTo(ROUTES.LOGIN);
      }
    }, [user, loading, navigateTo]);

    if (loading) return null;
    if (!user) return null;

    return <WrappedComponent />;
  };
};
