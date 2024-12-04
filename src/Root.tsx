import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Outlet } from "react-router-dom";
import { PageContainer } from "@/styles/common.styles";
import GlobalStyle from "@/styles/GlobalStyle";

// import { ThemeProvider } from "styled-components";
// import { useThemeStore } from "@/store/themeStore";

const Root = () => {
  // const currentTheme = useThemeStore((state) => state.currentTheme);

  return (
    // <ThemeProvider theme={currentTheme}>
    <>
      <GlobalStyle />
      <Header />
      <PageContainer>
        <Outlet />
      </PageContainer>
      <Footer />
    </>
    // </ThemeProvider>
  );
};

export default Root;
