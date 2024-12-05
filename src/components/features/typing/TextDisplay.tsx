import { Char, TextWrapper } from "@/styles/typing.styles";
import { useTypingStore } from "@/store/typingStore";

const TextDisplay = () => {
  const { text, currentIndex, errorHistory } = useTypingStore();

  return (
    <TextWrapper>
      {text.split("").map((char, index) => (
        <Char
          key={index}
          $state={
            index === currentIndex
              ? "current"
              : index < currentIndex
              ? errorHistory.some((error) => error.words.includes(text[index]))
                ? "incorrect"
                : "correct"
              : "waiting"
          }
        >
          {char}
        </Char>
      ))}
    </TextWrapper>
  );
};

export default TextDisplay;
