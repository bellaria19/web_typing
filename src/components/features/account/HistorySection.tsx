import { Section, SectionTitle } from "@/styles/account.styles";
import { useTranslation } from "react-i18next";

export const HistorySection = () => {
  const { t } = useTranslation();

  return (
    <Section>
      <SectionTitle>{t("ACCOUNT.HISTORY.TITLE")}</SectionTitle>
    </Section>
  );
};
