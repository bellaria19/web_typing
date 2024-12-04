// import { MAX_LENGTHS } from "@/constants";
// import { useText } from "@/hooks/useText";
import { Label, Container } from "@/styles/common.styles";
import { CharCount, UploadTextArea } from "@/styles/upload.styles";

interface DescriptionFieldProps {
  description: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DescriptionField = ({ description, onChange }: DescriptionFieldProps) => {
  // const text = useText();

  return (
    <Container>
      {/* <Label htmlFor="description">{text.UPLOAD.DESCRIPTION}</Label> */}
      <Label>Description</Label>
      <UploadTextArea
        id="description"
        className="description"
        value={description}
        onChange={onChange}
        // placeholder={text.UPLOAD.DESCRIPTION_PLACEHOLDER}
        placeholder="Description"
        required
        maxLength={1000}
      />
      <CharCount>{description.length} / 1000</CharCount>
    </Container>
  );
};

export default DescriptionField;
