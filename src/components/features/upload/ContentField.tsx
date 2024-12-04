import { useTranslation } from "react-i18next";
import { Label, Container } from "@/styles/common.styles";
import { CharCount, UploadTextArea } from "@/styles/upload.styles";

interface ContentFieldProps {
  content: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ContentField = ({ content, onChange }: ContentFieldProps) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Label htmlFor="content">{t("UPLOAD.CONTENT")}</Label>
      <UploadTextArea
        id="content"
        className="content"
        value={content}
        onChange={onChange}
        placeholder={t("UPLOAD.CONTENT_PLACEHOLDER")}
        required
        maxLength={1000}
      />
      <CharCount>{content.length} / 1000</CharCount>
    </Container>
  );
};

export default ContentField;
