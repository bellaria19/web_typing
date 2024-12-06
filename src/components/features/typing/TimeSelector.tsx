import { useTypingStore } from "@/store/typingStore";
import { SelectorButton, SelectorContainer } from "@/styles/typing.styles";

const TimeSelector = () => {
  const { timeLimit, setTimeLimit } = useTypingStore();

  const timeLimits = [15, 30, 45, 60];

  return (
    <SelectorContainer>
      <div className="flex items-center gap-2">
        {timeLimits.map((time) => (
          <SelectorButton
            key={time}
            $isSelected={timeLimit === time}
            onClick={() => setTimeLimit(time)}
          >
            {time}
          </SelectorButton>
        ))}
      </div>
    </SelectorContainer>
  );
};

export default TimeSelector;
