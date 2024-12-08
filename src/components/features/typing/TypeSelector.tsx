import { useTypingStore } from "@/store/typingStore";
import { SelectorButton, SelectorContainer } from "@/styles/typing.styles";
import { TestMode } from "@/types/typing";

const TypeSelector = () => {
  const { mode, setMode } = useTypingStore();

  const modes: TestMode[] = ["time", "word", "short", "long"];

  return (
    <SelectorContainer>
      <div className="flex items-center gap-2">
        {modes.map((testMode) => (
          <SelectorButton
            key={testMode}
            $isSelected={mode === testMode}
            onClick={() => setMode(testMode)}
          >
            {testMode}
          </SelectorButton>
        ))}
      </div>
    </SelectorContainer>
  );
};

export default TypeSelector;
