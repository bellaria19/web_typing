import { useAuth } from "@/hooks/useAuth";
import {
  LogoutBtn,
  LogoutIcon,
  Section,
  UserInfo,
} from "@/styles/account.styles";

interface UserSectionProps {
  handleLogout: () => void;
}

export const UserSection = ({ handleLogout }: UserSectionProps) => {
  const { user } = useAuth();

  console.log("user", user);
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
