// import { MAX_LENGTHS } from "@/constants";
// import { useText } from "@/hooks/useText";
import { Label, Container } from "@/styles/common.styles";
import { CharCount, UploadTextArea } from "@/styles/upload.styles";

interface ContentFieldProps {
  content: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ContentField = ({ content, onChange }: ContentFieldProps) => {
  // const text = useText();

  return (
    <Container>
      {/* <Label htmlFor="content">{text.UPLOAD.CONTENT}</Label> */}
      <Label>Content</Label>
      <UploadTextArea
        id="content"
        className="content"
        value={content}
        onChange={onChange}
        placeholder="Enter your content here..."
        required
        maxLength={1000}
      />
      <CharCount>{content.length} / 1000</CharCount>
    </Container>
  );
};

export default ContentField;
