import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Outlet } from "react-router-dom";
import { PageContainer } from "@/styles/common.styles";
import GlobalStyle from "@/styles/GlobalStyle";

import { ThemeProvider } from "styled-components";
import { useThemeStore } from "@/store/themeStore";
import { I18nextProvider } from "react-i18next";
import i18n from "@/locales/i18n";
const Root = () => {
  const currentTheme = useThemeStore((state) => state.currentTheme);

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        <Header />
        <PageContainer>
          <Outlet />
        </PageContainer>
        <Footer />
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default Root;
