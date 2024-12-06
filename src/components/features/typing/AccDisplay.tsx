import { useTranslation } from "react-i18next";
import { DisplayBox, DisplayLabel, DisplayValue } from "@/styles/typing.styles";

const AccuracyDisplay = ({ accuracy }: { accuracy: number }) => {
  const { t } = useTranslation();
  return (
    <DisplayBox>
      <DisplayLabel>{t("TYPING.ACCURACY")}</DisplayLabel>
      <DisplayValue>{accuracy}%</DisplayValue>
    </DisplayBox>
  );
};

export default AccuracyDisplay;
