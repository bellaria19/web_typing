import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@/hooks/useNavigation";
import {
  LogoutBtn,
  LogoutIcon,
  Section,
  UserInfo,
} from "@/styles/account.styles";
import { supabase } from "@/supabase/supabaseClient";

export const UserSection = () => {
  const { user } = useAuth();
  const { navigateTo } = useNavigation();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigateTo(ROUTES.LOGIN);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Section>
      <div className="flex items-center justify-between">
        <UserInfo>{user?.email}</UserInfo>
        <LogoutBtn onClick={handleLogout}>
          <LogoutIcon />
        </LogoutBtn>
      </div>
    </Section>
  );
};
