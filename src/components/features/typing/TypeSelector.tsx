import { useTypingStore } from "@/store/typingStore";
import { SelectorButton, SelectorContainer } from "@/styles/typing.styles";
import { TestMode } from "@/types/typing";
import { useTranslation } from "react-i18next";

const TypeSelector = () => {
  const { mode, setMode, loadContent } = useTypingStore();
  const { i18n } = useTranslation();

  const modes: TestMode[] = ["time", "word", "short", "long"];

  const handleModeChange = async (newMode: TestMode) => {
    setMode(newMode);
    await loadContent(i18n.language);
  };

  return (
    <SelectorContainer>
      <div className="flex items-center gap-2">
        {modes.map((testMode) => (
          <SelectorButton
            key={testMode}
            $isSelected={mode === testMode}
            onClick={() => handleModeChange(testMode)}
          >
            {testMode}
          </SelectorButton>
        ))}
      </div>
    </SelectorContainer>
  );
};

export default TypeSelector;
