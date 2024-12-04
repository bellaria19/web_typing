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

export const StatsSection = () => {
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Stats</SectionTitle>
        <StatsContainer />
      </SectionHeader>

      <StatsGrid>
        <StatCard>
          <StatTitle>AVG</StatTitle>
          <StatValue>100</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>WPM / CPM</StatTitle>
          <StatValue>50 / 100</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>ACC</StatTitle>
          <StatValue>90%</StatValue>
        </StatCard>
      </StatsGrid>
    </Section>
  );
};
