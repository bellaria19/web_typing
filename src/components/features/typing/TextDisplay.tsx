import { Char, TextWrapper } from "@/styles/typing.styles";
import { useTypingStore } from "@/store/typingStore";

const TextDisplay = () => {
  const { text, currentIndex, errorIndices } = useTypingStore();

  return (
    <TextWrapper>
      {text.split("").map((char, index) => (
        <Char
          key={index}
          $state={
            index === currentIndex
              ? "current"
              : index < currentIndex
              ? errorIndices.includes(index)
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
