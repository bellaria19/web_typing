import { Wrapper } from "@/styles/common.styles";
import { UserSection } from "@/components/features/account/UserSection";
import { StatsSection } from "@/components/features/account/StatsSection";
import { HistorySection } from "@/components/features/account/HistorySection";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@/hooks/useNavigation";
import { ROUTES } from "@/constants/routes";
import { useEffect } from "react";
import { supabase } from "@/supabase/supabaseClient";

const Account = () => {
  const { navigateTo } = useNavigation();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
      navigateTo(ROUTES.LOGIN);
    }
  }, [user, loading, navigateTo]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigateTo(ROUTES.LOGIN);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Wrapper>
      <UserSection handleLogout={handleLogout} />
      <hr className="py-6" />
      <StatsSection />
      <hr className="py-6" />
      <HistorySection />
    </Wrapper>
  );
};

export default Account;
