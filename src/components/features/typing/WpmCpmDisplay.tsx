import { DisplayBox, DisplayLabel, DisplayValue } from "@/styles/typing.styles";
import { useTranslation } from "react-i18next";

const WpmCpmDisplay = ({ wpm, cpm }: { wpm: number; cpm: number }) => {
  const { t } = useTranslation();
  return (
    <DisplayBox>
      <DisplayLabel>{t("TYPING.WPM_CPM")}</DisplayLabel>
      <DisplayValue>
        {wpm} / {cpm}
      </DisplayValue>
    </DisplayBox>
  );
};

export default WpmCpmDisplay;
