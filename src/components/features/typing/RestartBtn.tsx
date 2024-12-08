import { ReloadButton, ReloadIcon } from "@/styles/typing.styles";

const ReloadBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <ReloadButton onClick={onClick}>
      <ReloadIcon />
    </ReloadButton>
  );
};

export default ReloadBtn;
