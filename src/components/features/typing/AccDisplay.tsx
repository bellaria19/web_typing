import { DisplayBox, DisplayLabel, DisplayValue } from "@/styles/typing.styles";

const AccuracyDisplay = ({ accuracy }: { accuracy: number }) => (
  <DisplayBox>
    <DisplayLabel>정확도</DisplayLabel>
    <DisplayValue>{accuracy}%</DisplayValue>
  </DisplayBox>
);

export default AccuracyDisplay;
