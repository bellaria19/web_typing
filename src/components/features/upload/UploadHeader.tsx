import { Header } from "@/styles/upload.styles";
import { Title } from "@/styles/common.styles";
import { useTranslation } from "react-i18next";

const UploadHeader = () => {
  const { t } = useTranslation();
  return (
    <Header>
      <Title>{t("UPLOAD.TITLE")}</Title>
    </Header>
  );
};

export default UploadHeader;
