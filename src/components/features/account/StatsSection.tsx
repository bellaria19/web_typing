import {
  Section,
  SectionHeader,
  SectionTitle,
  StatCard,
  StatsGrid,
  StatTitle,
  StatValue,
} from "@/styles/account.styles";
import { StatsContainer } from "@/components/features/account/StatsContainer";
import { useTranslation } from "react-i18next";

export const StatsSection = () => {
  const { t } = useTranslation();

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>{t("ACCOUNT.STATS.TITLE")}</SectionTitle>
        <StatsContainer />
      </SectionHeader>

      <StatsGrid>
        <StatCard>
          <StatTitle>{t("ACCOUNT.STATS.AVG")}</StatTitle>
          <StatValue>100</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>{t("ACCOUNT.STATS.WPM_CPM")}</StatTitle>
          <StatValue>50 / 100</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>{t("ACCOUNT.STATS.ACCURACY")}</StatTitle>
          <StatValue>90%</StatValue>
        </StatCard>
      </StatsGrid>
    </Section>
  );
};
