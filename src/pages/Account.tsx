import { Wrapper } from "@/styles/common.styles";
import { UserSection } from "@/components/features/account/UserSection";
import { StatsSection } from "@/components/features/account/StatsSection";
import { HistorySection } from "@/components/features/account/HistorySection";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@/hooks/useNavigation";
import { ROUTES } from "@/constants/routes";
import { Loading } from "@/components/features/account/Loading";
import { useEffect } from "react";

const Account = () => {
  const { navigateTo } = useNavigation();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
      navigateTo(ROUTES.LOGIN);
    }
  }, [user, loading, navigateTo]);

  if (loading) return <Loading />;

  return (
    <Wrapper>
      <UserSection />
      <hr className="py-6" />
      <StatsSection />
      <hr className="py-6" />
      <HistorySection />
    </Wrapper>
  );
};

export default Account;
