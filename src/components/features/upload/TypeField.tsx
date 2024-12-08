import { Container, Label } from "@/styles/common.styles";
import { TypeBtn, TypeWrapper } from "@/styles/upload.styles";
import { UploadType } from "@/types/upload";
import { getUploadTypeLabel, UPLOAD_TYPES } from "@/constants/uploadType";
import { useTranslation } from "react-i18next";

interface TypeFieldProps {
  selectedType: UploadType | undefined;
  onTypeClick: (type: UploadType) => void;
}

const TypeField = ({ selectedType, onTypeClick }: TypeFieldProps) => {
  const { t } = useTranslation();

  const isDisabledType = (type: UploadType) => {
    return ["word", "quote", "proverb"].includes(type.value);
  };

  return (
    <Container>
      <Label htmlFor="type">{t("UPLOAD.TYPE")}</Label>
      <TypeWrapper>
        {UPLOAD_TYPES.map((type) => (
          <TypeBtn
            key={type.value}
            $isSelected={selectedType?.value === type.value}
            onClick={() => onTypeClick(type)}
            disabled={isDisabledType(type)}
            style={{
              opacity: isDisabledType(type) ? 0.5 : 1,
              cursor: isDisabledType(type) ? "not-allowed" : "pointer",
            }}
          >
            {getUploadTypeLabel(type)}
          </TypeBtn>
        ))}
      </TypeWrapper>
    </Container>
  );
};

export default TypeField;
