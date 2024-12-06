import { DisplayBox, DisplayLabel, DisplayValue } from "@/styles/typing.styles";
import { useTranslation } from "react-i18next";

const WpmDisplay = ({ wpm }: { wpm: number }) => {
  const { t } = useTranslation();
  return (
    <DisplayBox>
      <DisplayLabel>{t("TYPING.WPM")}</DisplayLabel>
      <DisplayValue>{wpm}</DisplayValue>
    </DisplayBox>
  );
};

export default WpmDisplay;
