import { ROUTES } from "@/constants/routes";
import { useNavigation } from "@/hooks/useNavigation";
import { useAuth } from "@/hooks/useAuth";
import {
  HeaderWrapper,
  HeaderTitle,
  Nav,
  NavButton,
} from "@/styles/header.styles";
import { useEffect } from "react";

export const Header = () => {
  const { navigateTo } = useNavigation();
  const { isAuthenticated, sessionExpiresIn } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      console.log(`세션 유효 시간: ${Math.floor(sessionExpiresIn / 60)}분`);
    }
  }, [isAuthenticated, sessionExpiresIn]);

  return (
    <HeaderWrapper>
      <HeaderTitle onClick={() => navigateTo(ROUTES.TYPING)}>
        typing
      </HeaderTitle>

      <Nav>
        <NavButton onClick={() => navigateTo(ROUTES.SETTINGS)}>
          Setting
        </NavButton>
        <NavButton onClick={() => navigateTo(ROUTES.UPLOAD)}>Upload</NavButton>
        {isAuthenticated ? (
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
