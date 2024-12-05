import { useTypingStore } from "@/store/typingStore";
import { Container, SelectorButton } from "@/styles/typing.styles";
import { TestMode } from "@/types/typing";

const TypeSelector = () => {
  const { mode, setMode } = useTypingStore();

  const modes: TestMode[] = ["words", "short", "long", "quote", "proverb"];

  return (
    <Container>
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
    </Container>
  );
};

export default TypeSelector;
