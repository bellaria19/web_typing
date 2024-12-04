import { Header } from "@/styles/upload.styles";
// import { useText } from "@/hooks/useText";
import { Title } from "@/styles/common.styles";

const UploadHeader = () => {
  // const text = useText();

  return (
    <Header>
      <Title>Upload</Title>
      {/* <Title>{text.UPLOAD.TITLE}</Title> */}
    </Header>
  );
};

export default UploadHeader;
