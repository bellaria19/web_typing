import { DisplayBox, DisplayLabel, DisplayValue } from "@/styles/typing.styles";
import { useTranslation } from "react-i18next";

const CpmDisplay = ({ cpm }: { cpm: number }) => {
  const { t } = useTranslation();
  return (
    <DisplayBox>
      <DisplayLabel>{t("TYPING.CPM")}</DisplayLabel>
      <DisplayValue>{cpm}</DisplayValue>
    </DisplayBox>
  );
};

export default CpmDisplay;
