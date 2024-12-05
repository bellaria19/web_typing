import { useTypingStore } from "@/store/typingStore";
import { Container, SelectorButton } from "@/styles/typing.styles";

const TimeSelector = () => {
  const { timeLimit, setTimeLimit } = useTypingStore();

  const timeLimits = [15, 30, 45, 60];

  return (
    <Container>
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
    </Container>
  );
};

export default TimeSelector;
