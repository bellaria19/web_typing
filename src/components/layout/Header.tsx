import { ROUTES } from "@/constants/routes";
import { useNavigation } from "@/hooks/useNavigation";
import { useAuth } from "@/hooks/useAuth";
import {
  HeaderWrapper,
  HeaderText,
  Nav,
  NavButton,
} from "@/styles/header/styles";

export const Header = () => {
  const { navigateTo } = useNavigation();
  const { user } = useAuth();

  return (
    <HeaderWrapper>
      <HeaderText onClick={() => navigateTo(ROUTES.TYPING)}>typing</HeaderText>

      <Nav>
        <NavButton onClick={() => navigateTo(ROUTES.SETTINGS)}>
          Setting
        </NavButton>
        <NavButton onClick={() => navigateTo(ROUTES.UPLOAD)}>Upload</NavButton>
        {user ? (
          <NavButton onClick={() => navigateTo(ROUTES.ACCOUNT)}>
            Account
          </NavButton>
        ) : (
          <NavButton onClick={() => navigateTo(ROUTES.LOGIN)}>Login</NavButton>
        )}
      </Nav>
    </HeaderWrapper>
  );
};
