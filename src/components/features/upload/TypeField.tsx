import { Container, Label } from "@/styles/common.styles";
import { TypeBtn, TypeWrapper } from "@/styles/upload.styles";
import { UploadType } from "@/types/upload";
import { getUploadTypeLabel, UPLOAD_TYPES } from "@/constants/uploadType";
// import { useLanguageStore } from "@/store/languageStore";
// import { useText } from "@/hooks/useText";

interface TypeFieldProps {
  selectedType: UploadType | undefined;
  onTypeClick: (type: UploadType) => void;
}

const TypeField = ({ selectedType, onTypeClick }: TypeFieldProps) => {
  //   const { language } = useLanguageStore();
  //   const text = useText();

  return (
    <Container>
      {/* <Label>{text.UPLOAD.CATEGORY}</Label> */}
      <Label>Type</Label>
      <TypeWrapper>
        {UPLOAD_TYPES.map((type) => (
          <TypeBtn
            key={type.value}
            $isSelected={selectedType?.value === type.value}
            onClick={() => onTypeClick(type)}
          >
            {getUploadTypeLabel(type)}
          </TypeBtn>
        ))}
      </TypeWrapper>
    </Container>
  );
};

export default TypeField;
