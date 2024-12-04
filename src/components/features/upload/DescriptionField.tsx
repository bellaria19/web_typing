import { useTranslation } from "react-i18next";
import { Label, Container } from "@/styles/common.styles";
import { CharCount, UploadTextArea } from "@/styles/upload.styles";

interface DescriptionFieldProps {
  description: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DescriptionField = ({ description, onChange }: DescriptionFieldProps) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Label htmlFor="description">{t("UPLOAD.DESCRIPTION")}</Label>
      <UploadTextArea
        id="description"
        className="description"
        value={description}
        onChange={onChange}
        placeholder={t("UPLOAD.DESCRIPTION_PLACEHOLDER")}
        required
        maxLength={1000}
      />
      <CharCount>{description.length} / 1000</CharCount>
    </Container>
  );
};

export default DescriptionField;
