import {
  LogoutBtn,
  LogoutIcon,
  Section,
  UserInfo,
} from "@/styles/account.styles";
import { User } from "@supabase/supabase-js";

interface UserSectionProps {
  user: User | null;
  handleLogout: () => void;
}

export const UserSection = ({ user, handleLogout }: UserSectionProps) => {
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
