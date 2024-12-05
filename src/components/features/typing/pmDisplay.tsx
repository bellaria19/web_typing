import { DisplayBox, DisplayLabel, DisplayValue } from "@/styles/typing.styles";

const WpmCpmDisplay = ({ wpm, cpm }: { wpm: number; cpm: number }) => (
  <DisplayBox>
    <DisplayLabel>WPM / CPM</DisplayLabel>
    <DisplayValue>
      {wpm} / {cpm}
    </DisplayValue>
  </DisplayBox>
);

export default WpmCpmDisplay;
