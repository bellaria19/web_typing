import { Char, TextWrapper } from "@/styles/typing.styles";
import { useTypingStore } from "@/store/typingStore";
import { useEffect, useState } from "react";

const TextDisplay = () => {
  const { text, currentIndex, errorIndices } = useTypingStore();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const handleKeyDown = () => setIsFocused(true);

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <TextWrapper $isFocused={isFocused}>
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
