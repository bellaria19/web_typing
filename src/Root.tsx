import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Outlet } from "react-router-dom";
import { PageContainer } from "@/styles/common.styles";
import GlobalStyle from "@/styles/GlobalStyle";

import { ThemeProvider } from "styled-components";
import { useThemeStore } from "@/store/themeStore";
import { I18nextProvider } from "react-i18next";
import i18n from "@/locales/i18n";
import { useSettingStore } from "@/store/settingStore";
import { useEffect } from "react";

const Root = () => {
  const { settings } = useSettingStore();
  const currentTheme = useThemeStore((state) => state.currentTheme);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-scale",
      String(settings.fontSize)
    );
  }, [settings]);

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
